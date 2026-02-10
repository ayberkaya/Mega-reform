import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ExpertCoursesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold text-primary">
            Kurslarım
          </h1>
          <p className="text-foreground/60 mt-1">
            Kurslarınızı yönetin ve yenilerini oluşturun
          </p>
        </div>
        <Link href="/uzman/kurslarim/yeni">
          <Button variant="primary">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Yeni Kurs
          </Button>
        </Link>
      </div>

      {/* Empty state */}
      <Card>
        <CardContent className="p-12 text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gold/10 flex items-center justify-center">
            <svg className="w-10 h-10 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h3 className="font-heading text-xl font-bold text-primary mb-2">
            Henüz kurs oluşturulmamış
          </h3>
          <p className="text-foreground/60 mb-6 max-w-md mx-auto">
            Uzmanlık alanınızda kapsamlı eğitim içerikler oluşturun. Öğrencilerinize adım adım rehberlik edin.
          </p>
          <Link href="/uzman/kurslarim/yeni">
            <Button variant="gold">İlk Kursunu Oluştur</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
