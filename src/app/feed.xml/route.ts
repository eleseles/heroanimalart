import { products } from '@/data/products';

export async function GET() {
  const siteUrl = 'https://heroanimalart.com';

  const items = products.map((product) => {
    const productUrl = `${siteUrl}/products/${product.slug}`;

    const description = product.description
      .replace(/\*\*/g, '')
      .replace(/[♥♦♣♠]/g, '-')
      .replace(/\n+/g, ' ')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .trim()
      .slice(0, 5000);

    const title = product.name
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    const regularPrice = product.originalPrice
      ? `${product.originalPrice.toFixed(2)} USD`
      : `${product.price.toFixed(2)} USD`;

    const salePrice = product.originalPrice
      ? `${product.price.toFixed(2)} USD`
      : null;

    const additionalImages = product.images
      .slice(1, 10)
      .map((img) => `      <g:additional_image_link>${img}</g:additional_image_link>`)
      .join('\n');

    return `    <item>
      <g:id>${product.id}</g:id>
      <g:title><![CDATA[${title}]]></g:title>
      <g:description><![CDATA[${description}]]></g:description>
      <g:link>${productUrl}</g:link>
      <g:image_link>${product.image}</g:image_link>
${additionalImages}
      <g:availability>in stock</g:availability>
      <g:price>${regularPrice}</g:price>
${salePrice ? `      <g:sale_price>${salePrice}</g:sale_price>` : ''}
      <g:brand>HeroAnimalArt</g:brand>
      <g:condition>new</g:condition>
      <g:google_product_category>Arts &amp; Entertainment &gt; Hobbies &amp; Creative Arts &gt; Artwork &gt; Posters, Prints, &amp; Visual Artwork</g:google_product_category>
      <g:product_type>Digital Art Print &gt; Poster Design</g:product_type>
      <g:identifier_exists>no</g:identifier_exists>
    </item>`;
  }).join('\n\n');

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>HeroAnimalArt</title>
    <link>${siteUrl}</link>
    <description>High-quality digital poster designs and art prints.</description>

${items}
  </channel>
</rss>`;

  return new Response(feed, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 's-maxage=86400, stale-while-revalidate',
    },
  });
}
