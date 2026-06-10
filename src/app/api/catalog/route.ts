import { products } from '@/data/products';

export async function GET() {
  // Drip-feed: Başlangıç tarihi (Bugün: 11 Mayıs 2026)
  const startDate = new Date('2026-05-11T00:00:00Z');
  const today = new Date();
  
  const diffTime = Math.max(0, today.getTime() - startDate.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
  
  // Her gün 5 ürün (Yeni hesap ısınma protokolü için kritik)
  const showCount = Math.min(diffDays * 5, products.length);
  const visibleProducts = products.slice(0, showCount);

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
<channel>
  <title>HeroAnimalArt - Dynamic Catalog</title>
  <link>https://heroanimalart.com</link>
  <description>Drip-fed DIY Woodworking Plans</description>`;

  visibleProducts.forEach(product => {
    const productUrl = `https://heroanimalart.com/products/${product.id}`;
    
    const productTitle = product.name.length > 95 ? product.name.substring(0, 95) + '...' : product.name;
    const productDesc = product.description.length > 450 ? product.description.substring(0, 450) + '...' : product.description;

    xml += `
  <item>
    <g:id>${product.id}</g:id>
    <guid isPermaLink="false">${product.id}</guid>
    <title><![CDATA[${productTitle}]]></title>
    <description><![CDATA[${productDesc}]]></description>
    <link>${productUrl}</link>
    <g:image_link>${product.image}</g:image_link>`;

    // Ek resimler
    if (product.images && product.images.length > 1) {
      product.images.slice(1).forEach(imgUrl => {
        if (imgUrl && imgUrl.trim() !== '') {
          xml += `
    <g:additional_image_link>${imgUrl}</g:additional_image_link>`;
        }
      });
    }

    xml += `
    <g:condition>new</g:condition>
    <g:availability>in stock</g:availability>
    ${product.originalPrice ? `
    <g:price>${product.originalPrice.toFixed(2)} USD</g:price>
    <g:sale_price>${product.price.toFixed(2)} USD</g:sale_price>` : `
    <g:price>${product.price.toFixed(2)} USD</g:price>`}
    <g:brand>HeroAnimalArt</g:brand>
    <g:google_product_category><![CDATA[Arts & Crafts > Patterns]]></g:google_product_category>
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
