import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import Link from "next/link";

const adminLinks = [
  { href: "/yonetim", label: "Panel" },
  { href: "/yonetim/kullanicilar", label: "Kullanicilar" },
  { href: "/yonetim/uzmanlar", label: "Uzmanlar" },
  { href: "/yonetim/makaleler", label: "Makaleler" },
  { href: "/yonetim/kurslar", label: "Kurslar" },
  { href: "/yonetim/videolar", label: "Videolar" },
  { href: "/yonetim/kategoriler", label: "Kategoriler" },
  { href: "/yonetim/abonelikler", label: "Abonelikler" },
  { href: "/yonetim/yorumlar", label: "Yorumlar" },
  { href: "/yonetim/ayarlar", label: "Ayarlar" },
];

export default async function YonetimLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    redirect("/panel");
  }

  return (
    <div className="flex min-h-screen bg-cream-light/30">
      <aside className="w-56 shrink-0 border-r border-lavender/10 bg-white p-4">
        <Link
          href="/yonetim"
          className="mb-6 block font-heading text-lg font-bold text-primary"
        >
          Yonetim
        </Link>
        <nav className="space-y-1">
          {adminLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block rounded-lg px-3 py-2 text-sm font-medium text-foreground/70 hover:bg-lavender/10 hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="mt-8 border-t border-lavender/10 pt-4">
          <Link
            href="/panel"
            className="block rounded-lg px-3 py-2 text-sm text-foreground/50 hover:text-primary"
          >
            Kullanici paneline don
          </Link>
        </div>
      </aside>
      <main className="flex-1 overflow-auto p-6 md:p-8">
        {children}
      </main>
    </div>
  );
}
