import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { AuthProvider } from "@/providers/auth-provider";
import { AnimationProvider } from "@/providers/animation-provider";
import { JsonLdOrganization, JsonLdWebSite } from "@/components/seo/json-ld";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Mega Reform | Ruhsal Gelişim Platformu",
    template: "%s | Mega Reform",
  },
  description:
    "Meditasyon, yoga, tarot ve ruhsal gelişim için uzman rehberlik platformu. İç huzurunuzu keşfetmeniz için yanınızdayız.",
  keywords: [
    "meditasyon",
    "yoga",
    "tarot",
    "ruhsal gelişim",
    "mindfulness",
    "nefes teknikleri",
    "iç huzur",
    "spirituel",
  ],
  authors: [{ name: "Mega Reform" }],
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: "Mega Reform",
    title: "Mega Reform | Ruhsal Gelisim Platformu",
    description:
      "Meditasyon, yoga, tarot ve ruhsal gelisim icin uzman rehberlik platformu.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mega Reform | Ruhsal Gelisim Platformu",
    description:
      "Meditasyon, yoga, tarot ve ruhsal gelisim icin uzman rehberlik platformu.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="scroll-smooth">
      <body
        className={`${cormorant.variable} ${inter.variable} font-body antialiased`}
      >
        <JsonLdOrganization />
        <JsonLdWebSite />
        <AuthProvider>
          <AnimationProvider>{children}</AnimationProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
