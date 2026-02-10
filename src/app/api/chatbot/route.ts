import { NextResponse } from "next/server";
import { gemini } from "@/lib/gemini";
import { CHATBOT_SYSTEM_PROMPT } from "@/content/chatbot-prompts";

interface ChatRequest {
  messages: { role: "user" | "assistant"; content: string }[];
}

// Demo experts for recommendation (will be replaced by DB query later)
const DEMO_EXPERTS = [
  {
    name: "Ayşe Nur Yılmaz",
    title: "Meditasyon Rehberi",
    specialty: "meditasyon",
    slug: "ayse-nur-yilmaz",
    moods: ["stresli", "huzursuz", "kaygi", "sinirli"],
  },
  {
    name: "Mehmet Can Demir",
    title: "Yoga Eğitmeni",
    specialty: "yoga",
    slug: "mehmet-can-demir",
    moods: ["yorgun", "stresli", "huzursuz", "sinirli"],
  },
  {
    name: "Elif Sena Kara",
    title: "Tarot Okuyucusu",
    specialty: "tarot",
    slug: "elif-sena-kara",
    moods: ["merakli", "arayis", "umutlu"],
  },
  {
    name: "Ahmet Barış Öztürk",
    title: "Ruhsal Danışmanı",
    specialty: "ruhsal-gelisim",
    slug: "ahmet-baris-ozturk",
    moods: ["uzgun", "karamsar", "arayis", "sinirli"],
  },
];

const MIN_THINKING_MS = 1800;
const MAX_THINKING_MS = 3200;

function randomThinkingDelay(): Promise<void> {
  const ms = MIN_THINKING_MS + Math.random() * (MAX_THINKING_MS - MIN_THINKING_MS);
  return new Promise((r) => setTimeout(r, ms));
}

export async function POST(request: Request) {
  try {
    const body: ChatRequest = await request.json();

    // Placebo: 1.8–3.2s "düşünme" süresi (kullanıcı yazıyor gibi görsün)
    await randomThinkingDelay();

    const apiKey = process.env.GEMINI_API_KEY?.trim();
    if (!apiKey) {
      if (process.env.NODE_ENV === "development") {
        console.warn(
          "[Chatbot] GEMINI_API_KEY yok veya boş – demo yanıt veriliyor. .env.local içine key ekleyip sunucuyu yeniden başlatın."
        );
      }
      const userMessageCount = body.messages.filter((m) => m.role === "user").length;
      const shouldRecommend = userMessageCount >= 3;
      return NextResponse.json({
        message: shouldRecommend
          ? "Sizinle tanıştığıma çok memnunum. Paylaştıklarınızdan iç dünyanızda bir arayış içinde olduğunuzu hissediyorum. Size şu rehberlerimizi öneriyorum."
          : "Bu hissi paylaştığınız için teşekkürler. Bu duygu son zamanlarda mı yoğunlaştı, yoksa belirli bir olay mı tetikliyor? Biraz daha anlatır mısınız?",
        analysis: shouldRecommend
          ? {
              mood: "arayis",
              intensity: 5,
              interests: ["meditasyon", "ruhsal-gelisim"],
              recommendExperts: true,
              experts: DEMO_EXPERTS.slice(0, 2).map((e) => ({
                slug: e.slug,
                reason: `${e.title} olarak iç yolculuğunuzda size rehberlik edebilir.`,
              })),
            }
          : { recommendExperts: false },
        experts: shouldRecommend
          ? DEMO_EXPERTS.slice(0, 2).map((e) => ({
              name: e.name,
              title: e.title,
              specialty: e.specialty,
              slug: e.slug,
              reason: `${e.title} olarak iç yolculuğunuzda size rehberlik edebilir.`,
            }))
          : [],
      });
    }

    const model =
      process.env.GEMINI_CHATBOT_MODEL || "gemini-2.0-flash";
    const contents = body.messages.map((m) => ({
      role: (m.role === "assistant" ? "model" : "user") as "user" | "model",
      parts: [{ text: m.content }],
    }));
    const response = await gemini.models.generateContent({
      model,
      contents,
      config: {
        systemInstruction: CHATBOT_SYSTEM_PROMPT,
        maxOutputTokens: 1024,
      },
    });

    const fullText = response.text ?? "";

    // Parse analysis block if present
    let analysis = null;
    let cleanMessage = fullText;

    const analysisMatch = fullText.match(
      /---ANALYSIS---\s*([\s\S]*?)\s*---END_ANALYSIS---/
    );
    if (analysisMatch) {
      try {
        analysis = JSON.parse(analysisMatch[1]);
        cleanMessage = fullText
          .replace(/---ANALYSIS---[\s\S]*?---END_ANALYSIS---/, "")
          .trim();
      } catch {
        // JSON parse failed, use full text as message
      }
    }

    // Build experts list: prefer AI-provided experts with reasons, else mood-based
    const expertList: { name: string; title: string; specialty: string; slug: string; reason: string }[] = [];
    if (analysis?.recommendExperts) {
      const fromAnalysis = analysis.experts as Array<{ slug: string; reason: string }> | undefined;
      if (Array.isArray(fromAnalysis) && fromAnalysis.length > 0) {
        for (const item of fromAnalysis.slice(0, 3)) {
          const expert = DEMO_EXPERTS.find((e) => e.slug === item.slug);
          if (expert && item.reason) {
            expertList.push({
              name: expert.name,
              title: expert.title,
              specialty: expert.specialty,
              slug: expert.slug,
              reason: item.reason,
            });
          }
        }
      }
      if (expertList.length === 0 && analysis.mood) {
        const byMood = DEMO_EXPERTS.filter((e) => e.moods.includes(analysis.mood)).slice(0, 3);
        const fallback = byMood.length > 0 ? byMood : DEMO_EXPERTS.slice(0, 2);
        fallback.forEach((e) =>
          expertList.push({
            name: e.name,
            title: e.title,
            specialty: e.specialty,
            slug: e.slug,
            reason: `${e.title} olarak ic yolculugunuzda size rehberlik edebilir.`,
          })
        );
      }
    }

    return NextResponse.json({
      message: cleanMessage,
      analysis,
      experts: expertList,
    });
  } catch (error) {
    console.error("Chatbot API error:", error);
    return NextResponse.json(
      {
        message:
          "Ozur dilerim, bir sorun olustu. Lutfen biraz sonra tekrar deneyin.",
        analysis: null,
        experts: [],
      },
      { status: 500 }
    );
  }
}
