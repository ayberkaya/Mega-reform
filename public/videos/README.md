# Stock videos

Tema videoları `src/lib/utils/constants.ts` içindeki `STOCK_VIDEOS` ile yapılandırılıyor.

**Performans:** 720p, kısa klipler kullanın; büyük dosyalar yavaşlatır.

---

## Anasayfadaki “İlham Veren İçerikler” (VideoShowcase) için iki yol

### 1) Yönetim panelinden gerçek videolar (önerilen)

- **Yol:** [Yönetim](http://localhost:3000/yonetim) → **Videolar** → **Yeni Video**
- Başlık, açıklama girin; **Öne çıkan** işaretleyin. İsteğe bağlı: **Thumbnail URL** (yoksa stok video oynar).
- Anasayfada en fazla **5 öne çıkan** video listelenir: biri büyük kutuda, dördü altta grid’de.
- Bu videolar `/videolar` sayfasına da gider; tıklanınca ilgili video sayfasına yönlendirir.

### 2) Sadece yerel dosya ile placeholder’ları doldurmak

Veritabanına video eklemeden, sadece **dosya koyarak** anasayfadaki bölümü doldurmak için bu klasöre şu isimlerle video koyun:

| Dosya adı | Nerede görünür |
|-----------|-----------------|
| `hero-bg.mp4` | Ana sayfa en üst (hero) arka plan |
| `showcase-featured.mp4` | VideoShowcase’deki **büyük kutu** (öne çıkan video yokken) |
| `showcase-1.mp4` | 1. küçük kart – “Sabah Meditasyonu” |
| `showcase-2.mp4` | 2. kart – “Nefes Calismasi” |
| `showcase-3.mp4` | 3. kart – “Yoga Akisi” |
| `showcase-4.mp4` | 4. kart – “Tarot Rehberi” |

Dosya koymazsanız ilgili yerde Pexels stok video (veya mevcut fallback) kullanılır.

---

İsterseniz `constants.ts` içinde `STOCK_VIDEOS` URL’lerini kendi CDN veya `/videos/...` yollarınıza güncelleyebilirsiniz.
