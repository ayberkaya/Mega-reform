import { NextResponse } from "next/server";
import { anthropic } from "@/lib/anthropic";
import { CHATBOT_SYSTEM_PROMPT } from "@/content/chatbot-prompts";

interface ChatRequest {
  messages: { role: "user" | "assistant"; content: string }[];
}

// Demo experts for recommendation (will be replaced by DB query later)
const DEMO_EXPERTS = [
  {
    name: "Ayse Nur Yilmaz",
    title: "Meditasyon Rehberi",
    specialty: "meditasyon",
    slug: "ayse-nur-yilmaz",
    moods: ["stresli", "huzursuz", "kaygi"],
  },
  {
    name: "Mehmet Can Demir",
    title: "Yoga Egitmeni",
    specialty: "yoga",
    slug: "mehmet-can-demir",
    moods: ["yorgun", "stresli", "huzursuz"],
  },
  {
    name: "Elif Sena Kara",
    title: "Tarot Okuyucusu",
    specialty: "tarot",
    slug: "elif-sena-kara",
    moods: ["merakli", "arayis", "umutlu"],
  },
  {
    name: "Ahmet Baris Ozturk",
    title: "Ruhsal Danismani",
    specialty: "ruhsal-gelisim",
    slug: "ahmet-baris-ozturk",
    moods: ["uzgun", "karamsar", "arayis"],
  },
];

export async function POST(request: Request) {
  try {
    const body: ChatRequest = await request.json();

    if (!process.env.ANTHROPIC_API_KEY) {
      // Return a demo response when no API key is configured
      return NextResponse.json({
        message:
          "Sizinle tanidigima cok memnunum. Paylastiklarinizdan ic dunyanizda bir arayis icinde oldugunuzu hissediyorum. Size yardimci olabilecek uzmanlarimiz var.",
        analysis: {
          mood: "arayis",
          intensity: 5,
          interests: ["meditasyon", "ruhsal-gelisim"],
          recommendExperts: true,
        },
        experts: DEMO_EXPERTS.slice(0, 3).map((e) => ({
          name: e.name,
          title: e.title,
          specialty: e.specialty,
          slug: e.slug,
          reason: `${e.title} olarak ic yolculugunuzda size rehberlik edebilir.`,
        })),
      });
    }

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-5-20250929",
      max_tokens: 1024,
      system: CHATBOT_SYSTEM_PROMPT,
      messages: body.messages.map((m) => ({
        role: m.role,
        content: m.content,
      })),
    });

    const textContent = response.content.find((c) => c.type === "text");
    const fullText = textContent?.text || "";

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

    // Find matching experts based on mood
    let experts: typeof DEMO_EXPERTS = [];
    if (analysis?.recommendExperts && analysis?.mood) {
      experts = DEMO_EXPERTS.filter((e) =>
        e.moods.includes(analysis.mood)
      ).slice(0, 3);

      // If no mood match, recommend based on interests
      if (experts.length === 0 && analysis.interests) {
        experts = DEMO_EXPERTS.filter((e) =>
          analysis.interests.includes(e.specialty)
        ).slice(0, 3);
      }

      // Fallback: recommend first 2
      if (experts.length === 0) {
        experts = DEMO_EXPERTS.slice(0, 2);
      }
    }

    return NextResponse.json({
      message: cleanMessage,
      analysis,
      experts: experts.map((e) => ({
        name: e.name,
        title: e.title,
        specialty: e.specialty,
        slug: e.slug,
        reason: `${e.title} olarak ic yolculugunuzda size rehberlik edebilir.`,
      })),
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
