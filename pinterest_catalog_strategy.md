# 🔴 Pinterest Katalog Feed & Büyüme Stratejisi — Tam Rehber

> Bu doküman, **heroanimalart.com** üzerinde @HeroAnimalArt hesabı için uygulanan Pinterest Catalog entegrasyonunun tüm teknik detaylarını, karşılaşılan hataları, çözümleri ve büyüme stratejisini içermektedir. Yeni bir site/hesap üzerinde aynı sistemi kurarken bu rehberi adım adım takip edin.

---

## 📋 İçindekiler

1. [Genel Mimari](#1-genel-mimari)
2. [Pinterest Business Hesap Kurulumu](#2-pinterest-business-hesap-kurulumu)
3. [Domain Doğrulama (Claim)](#3-domain-doğrulama-claim)
4. [RSS 2.0 Katalog Feed — Teknik Yapı](#4-rss-20-katalog-feed--teknik-yapı)
5. [Drip-Feed Stratejisi (Günde 5 Ürün)](#5-drip-feed-stratejisi-günde-5-ürün)
6. [Karşılaşılan Hatalar ve Çözümleri](#6-karşılaşılan-hatalar-ve-çözümleri)
7. [Ürün Verisi Yapısı (Product Data)](#7-ürün-verisi-yapısı-product-data)
8. [Pano (Board) & SEO Stratejisi](#8-pano-board--seo-stratejisi)
9. [Hesap Isınma Protokolü (Shadowban Önleme)](#9-hesap-isınma-protokolü-shadowban-önleme)
10. [CSV Toplu Yükleme Stratejisi](#10-csv-toplu-yükleme-stratejisi)
11. [Diagnostik & Sorun Giderme Kontrol Listesi](#11-diagnostik--sorun-giderme-kontrol-listesi)
12. [Tam Kod Şablonu (Next.js API Route)](#12-tam-kod-şablonu-nextjs-api-route)
13. [Günlük Operasyon Checklist](#13-günlük-operasyon-checklist)

---

## 1. Genel Mimari

```
Etsy Mağaza (Ürünler)
        │
        ▼
  EtsyListing.csv (export)
        │
        ▼
  Python Script (parse_etsy.py)
        │
        ├──▶ src/data/products.ts  (Site veritabanı)
        └──▶ pinterest.md          (Ürün referans tablosu)
        │
        ▼
  Next.js API Route (/api/catalog)
        │
        ▼
  RSS 2.0 XML Feed (https://domain.com/api/catalog)
        │
        ▼
  Pinterest Catalogs → Data Source URL
        │
        ▼
  Pinterest Shopping → Product Pins → Etsy Satışı
```

> [!IMPORTANT]
> Pinterest, feed URL'sini periyodik olarak çeker (fetch). Feed'deki ürünler **onaylandıktan** sonra "Shop" sekmesinde görünür ve ürün etiketleme (product tagging) özelliği açılır.

---

## 2. Pinterest Business Hesap Kurulumu

### Profil Ayarları
| Alan | Değer Örneği |
|------|-------------|
| **Kullanıcı Adı** | `@yenihesapadı` |
| **Görünen Ad** | `Marka Adı \| Woodworking, DIY Plans & Blueprints` |
| **Bio** | `Premium DIY woodworking plans. Build your dream projects at home. Shop our plans directly on Etsy. 👇` |
| **Website** | `https://yenidomain.com` |
| **Hesap Türü** | Business (İşletme) — **ZORUNLU** |

> [!WARNING]
> CSV Toplu Yükleme (Bulk Upload) ve Katalog (Catalogs) özelliğini kullanmak için **İşletme hesabı** ve **doğrulanmış (claimed) domain** şarttır. Etsy linki doğrulanamaz — kendi domaininiz olmalıdır.

---

## 3. Domain Doğrulama (Claim)

### Next.js ile Meta Tag Yöntemi

`layout.tsx` dosyasına Pinterest doğrulama meta tag'ini ekleyin:

```tsx
// src/app/layout.tsx
export const metadata: Metadata = {
  metadataBase: new URL('https://yenidomain.com'),
  title: {
    default: "Marka Adı | Premium DIY Plans",
    template: "%s | Marka Adı"
  },
  verification: {
    other: {
      'p:domain_verify': 'PINTEREST_VERIFICATION_CODE_BURAYA',
    },
  },
  alternates: {
    canonical: '/',
  },
};
```

### Doğrulama Adımları
1. Pinterest Business Hub → **Settings** → **Claim**
2. "Claim Website" → **HTML Tag** yöntemini seçin
3. Verilen kodu `p:domain_verify` değerine yapıştırın
4. Deploy edin ve "Verify" butonuna tıklayın
5. ✅ "Claimed" statüsü görünene kadar bekleyin

---

## 4. RSS 2.0 Katalog Feed — Teknik Yapı

### Kritik Kurallar

> [!CAUTION]
> Bu kurallardan herhangi birini ihlal etmek ürünlerin **toplu redine** yol açar!

| Kural | Açıklama | ❌ Yanlış | ✅ Doğru |
|-------|----------|-----------|---------|
| **Tag Namespace** | `title`, `description`, `link` standart RSS tag'leridir — `g:` prefix'i KULLANMAYIN | `<g:title>` | `<title>` |
| **Google Tags** | `g:id`, `g:price`, `g:brand`, `g:image_link`, `g:condition`, `g:availability`, `g:google_product_category`, `g:product_type`, `g:additional_image_link` → `g:` prefix'i KULLANIN | `<price>` | `<g:price>` |
| **Fiyat Formatı** | Ondalık ve para birimi zorunlu | `5 USD`, `$5.00` | `5.00 USD` |
| **CDATA Kullanımı** | Özel karakter içeren alanlar CDATA ile sarılmalı | `<title>Ahşap & Metal</title>` | `<title><![CDATA[Ahşap & Metal]]></title>` |
| **Karakter Kodlaması** | UTF-8 olmalı | `Content-Type: text/xml` | `Content-Type: application/xml; charset=utf-8` |
| **Cache** | Pinterest her zaman taze veri görmeli | `Cache-Control: max-age=3600` | `Cache-Control: no-store, max-age=0` |
| **GUID** | Her item'a benzersiz tanımlayıcı | *(eksik)* | `<guid isPermaLink="false">PRODUCT_ID</guid>` |
| **Kategori** | Metin veya ID kabul edilir | `505324` *(riskli)* | `Arts & Entertainment > Hobbies...` *(güvenli)* |

### Minimum Zorunlu Alanlar (Her `<item>` için)

```xml
<item>
  <g:id>UNIQUE_ID</g:id>
  <guid isPermaLink="false">UNIQUE_ID</guid>
  <title><![CDATA[Ürün Adı]]></title>
  <description><![CDATA[Ürün Açıklaması]]></description>
  <link>https://domain.com/products/ID</link>
  <g:image_link>https://resim-url.jpg</g:image_link>
  <g:condition>new</g:condition>
  <g:availability>in stock</g:availability>
  <g:price>5.00 USD</g:price>
  <g:brand>Marka Adı</g:brand>
  <g:google_product_category><![CDATA[Arts & Entertainment > Hobbies & Creative Arts > Crafts & Hobbies > Patterns & Blueprints]]></g:google_product_category>
  <g:product_type><![CDATA[Woodworking Plans]]></g:product_type>
</item>
```

### Ek Resimler (Opsiyonel ama Önerilen)

```xml
<g:additional_image_link>https://ek-resim-1.jpg</g:additional_image_link>
<g:additional_image_link>https://ek-resim-2.jpg</g:additional_image_link>
```

> [!TIP]
> Pinterest, birden fazla görseli olan ürünleri tercih eder. Etsy'den çekilen tüm ek resimleri `g:additional_image_link` olarak ekleyin.

---

## 5. Drip-Feed Stratejisi (Günde 5 Ürün)

### Neden Drip-Feed?
Pinterest yeni bir katalog kaynağından aniden **yüzlerce ürün** yüklendiğini görürse bunu **spam** olarak algılayabilir. Drip-feed ile:
- Hesap güveni (trust score) kademeli olarak artar
- Pinterest algoritması sizi "gerçek bir satıcı" olarak tanır
- Shadowban riski minimize edilir

### Implementasyon (Next.js API Route)

```typescript
// Başlangıç tarihi: İlk deploy tarihi
const startDate = new Date('2026-05-06T00:00:00Z');
const today = new Date();

// Kaç gün geçtiğini hesapla
const diffTime = Math.max(0, today.getTime() - startDate.getTime());
const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;

// Her gün 5 ürün ekle
const showCount = Math.min(diffDays * 5, products.length);
const visibleProducts = products.slice(0, showCount);
```

### Zamanlama
| Gün | Ürün Sayısı | Not |
|-----|-------------|-----|
| 1   | 5           | İlk batch |
| 2   | 10          | — |
| 7   | 35          | 1 hafta |
| 14  | 70          | 2 hafta |
| 30  | 150         | 1 ay → tüm ürünler |

> [!NOTE]
> Tüm ürünler yüklendikten sonra `showCount` artık `products.length`'e eşit olacak ve feed sabitlenecektir. Yeni ürün eklendiğinde otomatik olarak sıradaki güne düşer.

---

## 6. Karşılaşılan Hatalar ve Çözümleri

### ❌ Hata 1: "Failed to upload: 15, Successful: 0" — Tüm Ürünler Reddedildi
**Sebep:** `<title>`, `<description>`, `<link>` alanlarında `g:` namespace prefix'i kullanılmıştı.
**Pinterest Davranışı:** Bu 3 alan standart RSS 2.0'dır, `g:` ile yazılınca Pinterest "başlık/link yok" sanıp ürünü reddeder.
**Çözüm:** Bu 3 alanı `g:` olmadan yazın: `<title>`, `<description>`, `<link>`

### ❌ Hata 2: "9 Successful, 21 Failed" — Kısmi Red
**Sebep:** 10. üründen itibaren açıklamada özel karakterler (eğri kesme `'`, akıllı tırnak `"`) XML yapısını bozdu.
**Pinterest Davranışı:** XML parser 10. satırda hata alınca kalan tüm ürünleri atladı.
**Çözüm:** `title` ve `description` alanlarını `<![CDATA[...]]>` içine sarın. CDATA içindeki karakterler XML parser'ı bozmaz.

### ❌ Hata 3: "google_product_category" Warning
**Sebep:** Feed'de `google_product_category` alanı eksikti.
**Pinterest Davranışı:** Ürünler yüklenir ama "Warning" etiketi alır, dağıtım sınırlanabilir.
**Çözüm:** Her item'a `<g:google_product_category>` ekleyin.

### ❌ Hata 4: Fiyat Formatı
**Sebep:** `5 USD` (ondalıksız) yazılmıştı.
**Çözüm:** `product.price.toFixed(2) + ' USD'` → `5.00 USD`

### ❌ Hata 5: "Diagnostics boş ama ürünler hala fail"
**Sebep:** Pinterest satır bazlı rapor üretemeden dosya yapısal olarak bozuldu.
**Çözüm:** Hem "Ingestion Issues" hem "Distribution Issues" sekmelerini kontrol edin. Ayrıca "Past Ingestions" tablosundaki indirme ikonundan (↓) Pinterest'in çektiği dosyayı indirip bizzat XML'i okuyun.

### ❌ Hata 6: Deploy Yansımaması
**Sebep:** Kod değişiklikleri commit/push yapıldı ama Vercel deploy'u henüz tamamlanmamıştı.
**Çözüm:** Deploy log'larından başarılı deploy'u teyit edin, sonra Pinterest'te "Fetch Now" yapın.

---

## 7. Ürün Verisi Yapısı (Product Data)

### TypeScript Interface

```typescript
export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  currency: string;
  image: string;         // Ana görsel
  images: string[];      // Tüm görseller (ana dahil)
  tags: string[];        // SEO etiketleri
  description: string;
  publishedAt: string;
  modifiedAt: string;
}
```

### Etsy CSV'den Veri Çekme

Etsy'den dışa aktarılan CSV'de kullanılan sütunlar:

| CSV Sütunu | Product Alanı | Not |
|-----------|---------------|-----|
| `TITLE` | `name` | Tam ürün başlığı |
| `DESCRIPTION` | `description` | İlk 500 karakter yeterli |
| `PRICE` | `price` | Sayısal değer |
| `CURRENCY_CODE` | `currency` | Genelde "USD" |
| `IMAGE1` | `image` + `images[0]` | Ana görsel |
| `IMAGE2`..`IMAGE10` | `images[1..9]` | Ek görseller |
| `TAGS` (veya `TAG1`..`TAG13`) | `tags` | SEO tag'leri |
| `SECTION` | `category` | Etsy shop bölümü |

---

## 8. Pano (Board) & SEO Stratejisi

### Önerilen Board Yapısı
| Pano Adı | Açıklama |
|----------|----------|
| `DIY Woodworking Plans` | Ana ürün panosu |
| `Outdoor Projects & Garden` | Dış mekan projeleri |
| `Kids & Family Builds` | Çocuk mobilyası, oyun mutfağı vb. |
| `Event & Wedding Decor` | Düğün, parti dekorasyonu |
| `Mobile Bar & Food Cart Ideas` | Yiyecek/içecek arabaları |
| `Home Furniture Blueprints` | Yatak, dolap, masa planları |
| `Workshop & Garage` | Atölye ekipmanları |

### Board SEO Kuralları
- Board isimlerinde **anahtar kelimeler** kullanın
- Board açıklamalarını **en az 2-3 cümle** yazın
- Her board'a **en az 10 pin** ekleyin (5'i sizin, 5'i başkalarının)
- "Secret" board yapmayın — tüm board'lar public olmalı

---

## 9. Hesap Isınma Protokolü (Shadowban Önleme)

> [!CAUTION]
> **Önceki @HeroAnimalArt hesabı bu kurallar ihlal edildiği için shadowban yedi.** Toplu CSV yükleme, Pinterest'in resmi özelliği olsa bile, yeni hesapta ani hacim artışı spam olarak algılanır.

### İlk 14 Gün — Isınma Dönemi

| Gün | Eylem | Ayrıntı |
|-----|-------|---------|
| **1-3** | Sadece **Repin** | Başkalarının popüler pinlerini kendi board'larınıza kaydedin (günde 10-15). Kendi hiçbir şeyinizi paylaşmayın. |
| **4-5** | İlk kendi pinleriniz | Günde **2-3** kendi ürününüzü **manuel** olarak pinleyin (CSV kullanmayın). |
| **6-7** | CSV başlangıcı | İlk CSV yüklemesi: **sadece 5 ürün**. Başarılı olduğunu teyit edin. |
| **8-14** | Günde 5 pin | Her gün düzenli olarak 5 yeni ürün CSV ile yükleyin. |
| **15+** | Ölçekleme | Günde 5-10 pin'e çıkın. Hala sorun yoksa 10-15'e artırın. |

### Kesinlikle YAPMAYIN ❌
- İlk gün 50+ pin yükleme
- Tek CSV'ye 100 ürün koyma
- Aynı görseli farklı pinlerde kullanma
- Sadece kendi linklerinizi paylaşma (repin oranı düşük)
- Aynı açıklamayı tüm pinlerde kullanma (duplicate content)

### Kesinlikle YAPIN ✅
- Her pin için **farklı, özgün açıklama** yazın
- Açıklamalara **2-3 hashtag** ekleyin (#DIY #Woodworking)
- Pinleri **farklı saatlerde** yükleyin (sabah ve akşam)
- Haftada 1-2 kez başka hesapların pinlerini repin edin
- Board'lara **çeşitli** içerik ekleyin (sadece ürün değil)

---

## 10. CSV Toplu Yükleme Stratejisi

### Pinterest CSV Formatı

```csv
title,media_url,destination_url,board,description
"DIY Santa Sleigh Plans",https://i.etsystatic.com/.../il_fullxfull.xxx.jpg,https://domain.com/products/1,"DIY Woodworking Plans","Build a life-size holiday display! 🎅 #DIY #Woodworking #ChristmasDecor"
```

### CSV Kuralları
| Alan | Zorunlu | Açıklama |
|------|---------|----------|
| `title` | ✅ | Pin başlığı (max 100 karakter) |
| `media_url` | ✅ | Görsel URL (HTTPS, min 600x600px) |
| `destination_url` | ✅ | Hedef link (kendi siteniz veya Etsy) |
| `board` | ✅ | Hedef board adı (tam eşleşmeli) |
| `description` | ✅ | Pin açıklaması (max 500 karakter, hashtag ekleyin) |
| `publish_date` | ❌ | YYYY-MM-DD formatında ileri tarihli zamanlama |

### Her Gün 5 Pin — Operasyon Şablonu

1. `EtsyListing.csv`'den sıradaki 5 ürünü seçin
2. Pinterest CSV formatına dönüştürün
3. Her ürün için **farklı board** seçin (mümkünse)
4. Her ürün için **özgün açıklama** yazın
5. Pinterest → **Create** → **Create Pins** → **Upload CSV**
6. "Pin scheduling" ile farklı saatlere yayın

---

## 11. Diagnostik & Sorun Giderme Kontrol Listesi

Feed yüklendikten sonra hatalar alıyorsanız bu listeyi sırayla kontrol edin:

### Teknik Kontroller

- [ ] Feed URL'si tarayıcıda doğrudan açılıyor mu? (XML görünmeli)
- [ ] `Content-Type` header'ı `application/xml; charset=utf-8` mı?
- [ ] `Cache-Control: no-store` set edilmiş mi?
- [ ] XML dosyasında `<?xml version="1.0" encoding="UTF-8"?>` var mı?
- [ ] RSS namespace doğru mu? `xmlns:g="http://base.google.com/ns/1.0"`
- [ ] `<title>`, `<description>`, `<link>` → `g:` PREFIX'İ **YOK** mu?
- [ ] `<g:id>`, `<g:price>`, `<g:brand>` vb. → `g:` PREFIX'İ **VAR** mı?
- [ ] Fiyatlar `XX.XX USD` formatında mı?
- [ ] CDATA ile sarılmış mı: `<title><![CDATA[...]]></title>`?
- [ ] `<g:google_product_category>` her item'da var mı?
- [ ] Ürün linklerindeki URL'ler çalışan sayfalara gidiyor mu? (404 vermiyor mu?)

### Pinterest Panel Kontrolleri

- [ ] Data Sources → Past Ingestions → Status kontrol
- [ ] "Successful uploads" sayısı beklenen sayıda mı?
- [ ] "Failed to upload" varsa → sağdaki ↓ ikonundan dosyayı indirip XML'i kontrol edin
- [ ] Diagnostics → "Ingestion Issues" sekmesi boş mu?
- [ ] Diagnostics → "Distribution Issues" sekmesi boş mu?
- [ ] "Approved" yüzdesi %100 mü?

### Deploy Kontrolleri

- [ ] Son commit push edildi mi?
- [ ] Vercel/Hosting deploy başarılı mı? (Build log kontrol)
- [ ] Canlı URL güncel veriyi döndürüyor mu? (`no-store` aktif mi?)

---

## 12. Tam Kod Şablonu (Next.js API Route)

```typescript
// src/app/api/catalog/route.ts
import { products } from '@/data/products';

export async function GET() {
  // Drip-feed: Başlangıç tarihi
  const startDate = new Date('2026-05-06T00:00:00Z'); // DEĞİŞTİR
  const today = new Date();
  
  const diffTime = Math.max(0, today.getTime() - startDate.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
  
  // Her gün 5 ürün
  const showCount = Math.min(diffDays * 5, products.length);
  const visibleProducts = products.slice(0, showCount);

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
<channel>
  <title>MARKA ADI - Dynamic Catalog</title>
  <link>https://DOMAIN.com</link>
  <description>Drip-fed DIY Woodworking Plans</description>`;

  visibleProducts.forEach(product => {
    const productUrl = `https://DOMAIN.com/products/${product.id}`;
    
    xml += `
  <item>
    <g:id>${product.id}</g:id>
    <guid isPermaLink="false">${product.id}</guid>
    <title><![CDATA[${product.name}]]></title>
    <description><![CDATA[${product.description}]]></description>
    <link>${productUrl}</link>
    <g:image_link>${product.image}</g:image_link>`;

    // Ek resimler
    if (product.images && product.images.length > 1) {
      product.images.slice(1).forEach(imgUrl => {
        xml += `
    <g:additional_image_link>${imgUrl}</g:additional_image_link>`;
      });
    }

    xml += `
    <g:condition>new</g:condition>
    <g:availability>in stock</g:availability>
    <g:price>${product.price.toFixed(2)} USD</g:price>
    <g:brand>MARKA ADI</g:brand>
    <g:google_product_category><![CDATA[Arts & Entertainment > Hobbies & Creative Arts > Crafts & Hobbies > Patterns & Blueprints]]></g:google_product_category>
    <g:product_type><![CDATA[Woodworking Plans]]></g:product_type>
  </item>`;
  });

  xml += `
</channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'no-store, max-age=0',
    },
  });
}
```

> [!IMPORTANT]
> Yukarıdaki şablonda `DOMAIN.com`, `MARKA ADI` ve `startDate` değerlerini kendi projenize göre değiştirin.

---

## 13. Günlük Operasyon Checklist

### Her Gün (5 dakika)
- [ ] Pinterest Dashboard → Catalog → "Fetch Now" (veya otomatik schedule)
- [ ] Ingestion sonucunu kontrol et (Successful vs Failed)
- [ ] Eğer hata varsa → Diagnostics sekmesini kontrol et
- [ ] CSV ile 5 yeni pin yükle (Isınma dönemi sonrası)
- [ ] 3-5 adet başkalarının pinlerini repin et

### Her Hafta (15 dakika)
- [ ] Analytics → "Top Pins" kontrol et
- [ ] Düşük performanslı pinlerin açıklamalarını güncelle
- [ ] Yeni board oluştur veya mevcut board'lara çeşitli pin ekle
- [ ] Etsy'ye yeni ürün eklediyseniz → CSV güncelle, `products.ts` güncelle

### Her Ay (30 dakika)
- [ ] Catalog → "Approved" yüzdesi kontrol
- [ ] Distribution Issues kontrol
- [ ] Etsy satış verileriyle Pinterest trafik verilerini karşılaştır
- [ ] Feed URL'sini tarayıcıda aç, XML yapısını kontrol et
- [ ] Yeni ürünlerin siteye doğru eklendiğini teyit et

---

## Önemli Linkler

| Kaynak | URL |
|--------|-----|
| Pinterest Business Hub | https://business.pinterest.com |
| Pinterest Catalogs | Pinterest → Ads → Catalogs |
| Google Product Category Listesi | https://www.google.com/basepages/producttype/taxonomy.en-US.txt |
| Pinterest Feed Spec | https://help.pinterest.com/en/business/article/data-source-ingestion |

---

> [!NOTE]
> Bu doküman, **heroanimalart.com** projesinde yaşanan tüm deneyimlerden derlenmiştir. Yeni projede aynı hataları tekrarlamamak için bu rehberi adım adım takip edin ve özellikle **Bölüm 6 (Hatalar)** ve **Bölüm 9 (Isınma Protokolü)** bölümlerine özel dikkat gösterin.
