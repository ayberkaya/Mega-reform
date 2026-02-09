import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function MyCoursesPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="font-heading text-3xl font-bold text-primary">Kurslarim</h1>

      {/* Empty state */}
      <Card>
        <CardContent className="p-12 text-center">
          <div className="w-16 h-16 rounded-full bg-lavender/20 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-primary/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h3 className="font-heading text-xl font-bold text-primary mb-2">
            Henüz bir kursa kayıt olmadınız
          </h3>
          <p className="text-foreground/50 text-sm mb-6 max-w-md mx-auto">
            Uzmanlarimizin hazirladigi kurslarla ruhsal yolculugunuza baslayabilirsiniz.
          </p>
          <Link href="/kurslar">
            <Button variant="primary">Kursları Keşfet</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
