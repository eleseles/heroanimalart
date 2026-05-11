import { products } from '@/data/products';
import { NextResponse } from 'next/server';

export async function GET() {
  // Başlangıç tarihi: 6 Mayıs 2026
  const startDate = new Date('2026-05-06T00:00:00Z');
  const today = new Date();
  
  // Kaç gün geçtiğini hesapla
  const diffTime = Math.max(0, today.getTime() - startDate.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1; // Bugün 1. gün
  
  // Her gün 5 ürün ekle
  const showCount = Math.min(diffDays * 5, products.length);
  const visibleProducts = products.slice(0, showCount);

  // XML oluştur
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
<channel>
  <title>Bizilla Creative - Dynamic Catalog</title>
  <link>https://freediyplans.com</link>
  <description>Drip-fed DIY Woodworking Plans</description>`;

  visibleProducts.forEach(product => {
    const productUrl = `https://freediyplans.com/products/${product.id}`;
    
    xml += `
  <item>
    <g:id>${product.id}</g:id>
    <guid isPermaLink="false">${product.id}</guid>
    <title>${escapeXml(product.name)}</title>
    <description>${escapeXml(product.description)}</description>
    <link>${escapeXml(productUrl)}</link>
    <g:image_link>${escapeXml(product.image)}</g:image_link>`;

    // Ek resimleri ekle
    if (product.images && product.images.length > 1) {
      product.images.slice(1).forEach(imgUrl => {
        xml += `
    <g:additional_image_link>${escapeXml(imgUrl)}</g:additional_image_link>`;
      });
    }

    xml += `
    <g:condition>new</g:condition>
    <g:availability>in stock</g:availability>
    <g:price>${product.price.toFixed(2)} USD</g:price>
    <g:brand>Bizilla</g:brand>
    <g:google_product_category>Arts &amp; Entertainment &gt; Hobbies &amp; Creative Arts &gt; Crafts &amp; Hobbies &gt; Patterns &amp; Blueprints</g:google_product_category>
    <g:product_type>Woodworking Plans</g:product_type>
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

function escapeXml(unsafe: string) {
  return unsafe.replace(/[<>&"']/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '"': return '&quot;';
      case "'": return '&apos;';
      default: return c;
    }
  });
}
