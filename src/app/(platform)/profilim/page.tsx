import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user) redirect("/giris");

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="font-heading text-3xl font-bold text-primary">Profilim</h1>

      <Card>
        <CardContent className="p-6 md:p-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <Avatar
              src={session.user.image}
              alt={session.user.name || "Kullanıcı"}
              size="xl"
            />
            <div className="flex-1 text-center sm:text-left">
              <h2 className="font-heading text-2xl font-bold text-primary">
                {session.user.name || "İsimsiz Yolcu"}
              </h2>
              <p className="text-foreground/50 text-sm mt-1">
                {session.user.email}
              </p>
              <div className="flex flex-wrap gap-2 mt-3 justify-center sm:justify-start">
                <Badge variant="sage">
                  {session.user.role === "ADMIN"
                    ? "Yonetici"
                    : session.user.role === "EXPERT"
                      ? "Uzman"
                      : "Uye"}
                </Badge>
                <Badge variant="gold">Ücretsiz Plan</Badge>
              </div>
              <div className="mt-4">
                <Link href="/profilim/duzenle">
                  <Button variant="secondary" size="sm">
                    Profili Düzenle
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-heading font-bold text-primary">0</p>
            <p className="text-xs text-foreground/50">Kurs</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-heading font-bold text-primary">0</p>
            <p className="text-xs text-foreground/50">Favori</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-heading font-bold text-primary">0</p>
            <p className="text-xs text-foreground/50">Yorum</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
