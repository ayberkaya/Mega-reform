"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/button";
import { NAV_LINKS } from "@/lib/utils/constants";
import { tr } from "@/content/tr";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isLanding = pathname === "/";
  const useSolidHeader = scrolled || !isLanding;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          useSolidHeader
            ? "bg-white/90 backdrop-blur-xl shadow-sm border-b border-lavender/10"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <LotusIcon
                className={cn(
                  "w-8 h-8 transition-colors duration-300",
                  useSolidHeader ? "text-primary" : "text-lavender"
                )}
              />
              <span
                className={cn(
                  "font-heading text-xl md:text-2xl font-bold tracking-wide transition-colors duration-300",
                  useSolidHeader ? "text-primary" : "text-white"
                )}
              >
                Mega Reform
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:bg-lavender/20",
                    useSolidHeader ? "text-foreground" : "text-white/90 hover:text-white"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  !useSolidHeader && "text-white/90 hover:text-white hover:bg-white/10"
                )}
              >
                {tr.auth.login}
              </Button>
              <Button variant={useSolidHeader ? "primary" : "gold"} size="sm">
                {tr.auth.register}
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className={cn(
                "md:hidden p-2 rounded-lg transition-colors",
                useSolidHeader ? "text-foreground" : "text-white"
              )}
              aria-label="Menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {mobileOpen ? (
                  <path d="M18 6L6 18M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div
              className="absolute inset-0 bg-primary-dark/50 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.nav className="absolute right-0 top-0 bottom-0 w-72 bg-white/95 backdrop-blur-xl shadow-2xl p-6 pt-20 flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 rounded-xl text-foreground font-medium hover:bg-lavender/20 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-6 flex flex-col gap-3">
                <Button variant="secondary" className="w-full">
                  {tr.auth.login}
                </Button>
                <Button variant="primary" className="w-full">
                  {tr.auth.register}
                </Button>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function LotusIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M16 4c-2 4-6 8-6 12s2.7 7.3 6 8c3.3-.7 6-4 6-8s-4-8-6-12z" opacity="0.9" />
      <path d="M16 4c-4 3-10 6-12 10 2 4 6 6 10 7-2-3-3.5-8-2-13 1-2 2.5-3 4-4z" opacity="0.6" />
      <path d="M16 4c4 3 10 6 12 10-2 4-6 6-10 7 2-3 3.5-8 2-13-1-2-2.5-3-4-4z" opacity="0.6" />
      <path d="M6 18c1 3 4 5.5 8 6-2-1.5-4-4-5-6.5-.5-1-1-2-1.5-2.5-.5 1-1 2-1.5 3z" opacity="0.4" />
      <path d="M26 18c-1 3-4 5.5-8 6 2-1.5 4-4 5-6.5.5-1 1-2 1.5-2.5.5 1 1 2 1.5 3z" opacity="0.4" />
    </svg>
  );
}
