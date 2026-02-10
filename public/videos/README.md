# Stock videos

Tema videoları `src/lib/utils/constants.ts` içindeki `STOCK_VIDEOS` ile yapılandırılıyor; varsayılan olarak Pexels CDN kullanılıyor.

**Performans:** Videoları bu klasöre koymak siteyi yavaşlatmaz; aynı boyutta dosya kullanırsanız self-host genelde daha stabil ve cache dostu olur. Yavaşlık büyük dosyalardan (4K, uzun süre) gelir – **720p, kısa klipler** kullanın.

Kendi videolarınızı kullanmak için:

1. [Pexels](https://www.pexels.com/search/videos/meditation/) veya [Coverr](https://coverr.co/stock-video-footage/meditation) üzerinden meditasyon / doğa / huzur temalı videolar indirin (**720p tercih**).
2. Şu isimlerle bu klasöre koyun:
   - `hero-bg.mp4` – hero arka plan (isteğe bağlı; constants’ta URL’i `/videos/hero-bg.mp4` yapın)
3. İsterseniz `constants.ts` içinde `STOCK_VIDEOS` URL’lerini kendi CDN veya `/videos/...` yollarınıza güncelleyin.
