import Link from "next/link";
import { tr } from "@/content/tr";
import { CATEGORIES, SITE_NAME } from "@/lib/utils/constants";

export function Footer() {
  return (
    <footer className="bg-primary-dark text-white/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Lotus divider */}
        <div className="flex justify-center mb-12">
          <svg
            className="w-10 h-10 text-lavender/40"
            viewBox="0 0 32 32"
            fill="currentColor"
          >
            <path d="M16 4c-2 4-6 8-6 12s2.7 7.3 6 8c3.3-.7 6-4 6-8s-4-8-6-12z" opacity="0.9" />
            <path d="M16 4c-4 3-10 6-12 10 2 4 6 6 10 7-2-3-3.5-8-2-13 1-2 2.5-3 4-4z" opacity="0.6" />
            <path d="M16 4c4 3 10 6 12 10-2 4-6 6-10 7 2-3 3.5-8 2-13-1-2-2.5-3-4-4z" opacity="0.6" />
          </svg>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <h3 className="font-heading text-2xl text-white font-bold mb-4">
              {SITE_NAME}
            </h3>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Meditasyon, yoga, tarot ve ruhsal gelişim için uzman rehberlik
              platformu. İç huzurunuzu keşfetmeniz için yanınızdayız.
            </p>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="font-heading text-lg text-white font-semibold mb-4">
              {tr.footer.platform}
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/iceride-ne-var" className="text-sm hover:text-lavender transition-colors">
                  İçeride ne var?
                </Link>
              </li>
              <li>
                <Link href="/pratikler" className="text-sm hover:text-lavender transition-colors">
                  Pratikler
                </Link>
              </li>
              <li>
                <Link href="/uzmanlar" className="text-sm hover:text-lavender transition-colors">
                  Rehberler
                </Link>
              </li>
              <li>
                <Link href="/makaleler" className="text-sm hover:text-lavender transition-colors">
                  Makaleler
                </Link>
              </li>
              <li>
                <Link href="/kurslar" className="text-sm hover:text-lavender transition-colors">
                  Kurslar
                </Link>
              </li>
              <li>
                <Link href="/videolar" className="text-sm hover:text-lavender transition-colors">
                  Videolar
                </Link>
              </li>
              <li>
                <Link href="/uyelik" className="text-sm hover:text-lavender transition-colors">
                  Üyelik
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-heading text-lg text-white font-semibold mb-4">
              {tr.footer.categories}
            </h4>
            <ul className="space-y-2.5">
              {CATEGORIES.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/makaleler/kategori/${cat.slug}`}
                    className="text-sm hover:text-lavender transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-heading text-lg text-white font-semibold mb-4">
              {tr.footer.legal}
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/hakkimizda" className="text-sm hover:text-lavender transition-colors">
                  {tr.footer.about}
                </Link>
              </li>
              <li>
                <Link href="/iletisim" className="text-sm hover:text-lavender transition-colors">
                  {tr.footer.contact}
                </Link>
              </li>
              <li>
                <Link
                  href="/gizlilik-politikasi"
                  className="text-sm hover:text-lavender transition-colors"
                >
                  {tr.footer.privacy}
                </Link>
              </li>
              <li>
                <Link
                  href="/kullanim-sartlari"
                  className="text-sm hover:text-lavender transition-colors"
                >
                  {tr.footer.terms}
                </Link>
              </li>
              <li>
                <Link
                  href="/sikca-sorulan-sorular"
                  className="text-sm hover:text-lavender transition-colors"
                >
                  {tr.footer.faq}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/10 text-center">
          <p className="text-white/40 text-sm">
            &copy; {new Date().getFullYear()} {SITE_NAME}. {tr.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
