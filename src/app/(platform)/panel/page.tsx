import { auth } from "@/lib/auth";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await auth();

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-2">
          Hosgeldiniz, {session?.user?.name?.split(" ")[0] || "Yolcu"}
        </h1>
        <p className="text-foreground/60">
          Ruhsal yolculuğunuzda bugün sizi neler bekliyor?
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-lavender/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-heading font-bold text-primary">Ucretsiz</p>
                <p className="text-xs text-foreground/50">Mevcut Plan</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sage/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-heading font-bold text-primary">0</p>
                <p className="text-xs text-foreground/50">Kayıtlı Kurs</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gold/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-heading font-bold text-primary">0</p>
                <p className="text-xs text-foreground/50">Favori</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cream flex items-center justify-center">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-heading font-bold text-primary">0</p>
                <p className="text-xs text-foreground/50">Sohbet</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="hover:shadow-xl">
          <CardHeader>
            <h3 className="font-heading text-xl font-bold text-primary">
              Ruhsal Yolculugunuzu Baslatın
            </h3>
          </CardHeader>
          <CardContent>
            <p className="text-foreground/60 text-sm mb-4">
              Planınızı yükselterek sınırsız içerik erişimi ve uzman danışmanlığı kazanın.
            </p>
            <Link href="/abonelik">
              <Button variant="gold" size="sm">
                Planlari Incele
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-xl">
          <CardHeader>
            <h3 className="font-heading text-xl font-bold text-primary">
              One Cikan Kurslar
            </h3>
          </CardHeader>
          <CardContent>
            <p className="text-foreground/60 text-sm mb-4">
              Uzmanlarimizin hazirladigi kurslarla ic yolculugunuza baslayın.
            </p>
            <Link href="/kurslar">
              <Button variant="primary" size="sm">
                Kurslari Kesfedin
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Subscription Banner */}
      <Card className="bg-gradient-to-r from-primary to-primary-light border-none text-white">
        <CardContent className="p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge className="bg-gold/20 text-gold border-none">
                Mevcut Plan
              </Badge>
              <span className="font-heading text-lg font-bold">Ucretsiz</span>
            </div>
            <p className="text-white/70 text-sm">
              Ayda 3 makale erişimi. Daha fazlası için planınızı yükseltin.
            </p>
          </div>
          <Link href="/abonelik">
            <Button variant="gold" size="md">
              Plani Yukselt
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
