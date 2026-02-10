import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function ExpertArticlesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold text-primary">
            Makalelerim
          </h1>
          <p className="text-foreground/60 mt-1">
            Makalelerinizi yonetin ve yenilerini olusturun
          </p>
        </div>
        <Link href="/uzman/makalelerim/yeni">
          <Button variant="primary">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Yeni Makale
          </Button>
        </Link>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2">
        {["Tumu", "Yayinda", "Taslak", "Arsiv"].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              tab === "Tumu"
                ? "bg-primary text-white"
                : "text-foreground/60 hover:bg-lavender/10"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Empty state */}
      <Card>
        <CardContent className="p-12 text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-sage/10 flex items-center justify-center">
            <svg className="w-10 h-10 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
          <h3 className="font-heading text-xl font-bold text-primary mb-2">
            Henüz makale yazılmamış
          </h3>
          <p className="text-foreground/60 mb-6 max-w-md mx-auto">
            Bilgi ve deneyimlerinizi paylasarak toplulugumuza ilham verin. Ilk makalenizi simdi yazin.
          </p>
          <Link href="/uzman/makalelerim/yeni">
            <Button variant="gold">Ilk Makaleni Yaz</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
