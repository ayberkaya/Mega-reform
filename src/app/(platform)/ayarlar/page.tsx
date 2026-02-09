"use client";

import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function SettingsPage() {
  const { data: session } = useSession();

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="font-heading text-3xl font-bold text-primary">Ayarlar</h1>

      {/* Account Info */}
      <Card>
        <CardHeader>
          <h2 className="font-heading text-lg font-semibold text-primary">
            Hesap Bilgileri
          </h2>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-lavender/10">
            <div>
              <p className="text-sm font-medium text-foreground/80">E-posta</p>
              <p className="text-sm text-foreground/50">{session?.user?.email}</p>
            </div>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-lavender/10">
            <div>
              <p className="text-sm font-medium text-foreground/80">Hesap Turu</p>
              <Badge variant="sage" className="mt-1">
                {session?.user?.role === "ADMIN" ? "Yonetici" : session?.user?.role === "EXPERT" ? "Uzman" : "Uye"}
              </Badge>
            </div>
          </div>
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="text-sm font-medium text-foreground/80">Şifre</p>
              <p className="text-sm text-foreground/50">••••••••</p>
            </div>
            <Button variant="secondary" size="sm">
              Degistir
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Notification Preferences */}
      <Card>
        <CardHeader>
          <h2 className="font-heading text-lg font-semibold text-primary">
            Bildirim Tercihleri
          </h2>
        </CardHeader>
        <CardContent className="space-y-4">
          <label className="flex items-center justify-between py-2 cursor-pointer">
            <span className="text-sm text-foreground/70">Haftalik bulten</span>
            <input type="checkbox" defaultChecked className="w-4 h-4 rounded accent-primary" />
          </label>
          <label className="flex items-center justify-between py-2 cursor-pointer">
            <span className="text-sm text-foreground/70">Yeni kurs bildirimleri</span>
            <input type="checkbox" defaultChecked className="w-4 h-4 rounded accent-primary" />
          </label>
          <label className="flex items-center justify-between py-2 cursor-pointer">
            <span className="text-sm text-foreground/70">Uzman yanitlari</span>
            <input type="checkbox" defaultChecked className="w-4 h-4 rounded accent-primary" />
          </label>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-red-200">
        <CardHeader>
          <h2 className="font-heading text-lg font-semibold text-red-500">
            Tehlikeli Bolge
          </h2>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-foreground/50 mb-4">
            Hesabinizi silerseniz tum verileriniz kalici olarak kaybolur. Bu islem geri alinamaz.
          </p>
          <Button variant="danger" size="sm">
            Hesabi Sil
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
