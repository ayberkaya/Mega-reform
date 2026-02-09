import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function FavoritesPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="font-heading text-3xl font-bold text-primary">Favorilerim</h1>

      <Card>
        <CardContent className="p-12 text-center">
          <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gold/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h3 className="font-heading text-xl font-bold text-primary mb-2">
            Henuz favori iceriginiz yok
          </h3>
          <p className="text-foreground/50 text-sm mb-6 max-w-md mx-auto">
            Makaleleri ve kurslari favorilerinize ekleyerek daha sonra kolayca ulasabilirsiniz.
          </p>
          <Link href="/makaleler">
            <Button variant="primary">Makaleleri Keşfet</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
