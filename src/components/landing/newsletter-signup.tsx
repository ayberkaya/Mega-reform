"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { tr } from "@/content/tr";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");

  return (
    <section className="py-20 md:py-24 bg-cream">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <ScrollReveal>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-3">
            {tr.landing.newsletterTitle}
          </h2>
          <p className="text-foreground/60 mb-8">
            {tr.landing.newsletterSubtitle}
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
          >
            <Input
              type="email"
              placeholder={tr.landing.newsletterPlaceholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1"
            />
            <Button variant="primary" type="submit">
              {tr.landing.newsletterCta}
            </Button>
          </form>
          <p className="text-xs text-foreground/40 mt-4">
            Gizliliginize saygı duyuyoruz. Istediginiz zaman aboneliginizi iptal edebilirsiniz.
          </p>
          <p className="mt-6">
            <Link
              href="/iceride-ne-var"
              className="text-primary font-medium text-sm hover:underline underline-offset-2"
            >
              İçeride ne var?
            </Link>
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
