import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsInsideSection } from "@/components/landing/whats-inside-section";

export const metadata: Metadata = {
  title: "İçeride Ne Var? | Mega Reform",
  description:
    "Rehberli pratikler, makaleler, kurslar ve videolarla ruhsal gelişim yolculuğun.",
};

export default function IcerideNeVarPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background pt-20">
        <WhatsInsideSection />
      </main>
      <Footer />
    </>
  );
}
