export type InventoryStripStats = {
  total: number;
  audio: number;
  video: number;
  text: number;
};

interface InventoryStripProps {
  stats: InventoryStripStats | null;
}

function Stat({ value, label }: { value: number | string; label: string }) {
  return (
    <div className="text-center">
      <p className="font-heading text-3xl md:text-4xl font-bold text-primary">
        {value}
      </p>
      <p className="mt-1 text-sm font-medium text-foreground/70">{label}</p>
    </div>
  );
}

export function InventoryStrip({ stats }: InventoryStripProps) {
  const isEmpty = !stats || stats.total === 0;

  return (
    <section className="py-16 md:py-20 bg-background border-b border-lavender/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-lavender/20 bg-white py-12 px-6 md:px-10">
          {isEmpty ? (
            <div className="text-center py-4">
              <p className="font-body text-foreground/70">
                Demo içerikler yükleniyor
              </p>
              <p className="mt-2 text-sm text-foreground/50">
                Katalog kısa süre içinde güncellenecek.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              <Stat value={stats.total} label="Toplam pratik" />
              <Stat value={stats.audio} label="Ses" />
              <Stat value={stats.video} label="Video" />
              <Stat value={stats.text} label="Yazı" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
