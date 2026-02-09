import { Card, CardContent } from "@/components/ui/card";

export default function YonetimMakalelerPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-heading text-3xl font-bold text-primary">
        Makaleler
      </h1>
      <Card>
        <CardContent className="p-12 text-center text-foreground/60">
          Bu bolum Phase 4C kapsaminda gelistirilecek.
        </CardContent>
      </Card>
    </div>
  );
}
