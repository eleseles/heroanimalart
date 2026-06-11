import { products } from '@/data/products';

export async function GET() {
  const siteUrl = 'https://heroanimalart.com';
  const siteTitle = 'HeroAnimalArt Posters';
  const siteDescription = 'High-quality digital poster designs and art prints.';

  const rssItems = products.map((product) => {
    const productUrl = `${siteUrl}/products/${product.id}`;
    // Include the main image in the description so Pinterest can scrape it
    // Or you can include all images. Pinterest will often pick the first image in the description or enclosure.
    const imagesHtml = product.images.map(img => `<img src="${img}" alt="${product.name}" />`).join('');
    
    return `
      <item>
        <title><![CDATA[${product.name}]]></title>
        <link>${productUrl}</link>
        <guid isPermaLink="true">${productUrl}</guid>
        <description><![CDATA[
          ${imagesHtml}
          <p>${product.description}</p>
          <p>Price: $${product.price.toFixed(2)}</p>
        ]]></description>
        <pubDate>${new Date(product.publishedAt || new Date()).toUTCString()}</pubDate>
      </item>
    `;
  }).join('');

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
      <channel>
        <title>${siteTitle}</title>
        <link>${siteUrl}</link>
        <description>${siteDescription}</description>
        <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
        ${rssItems}
      </channel>
    </rss>
  `;

  return new Response(rssFeed, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 's-maxage=86400, stale-while-revalidate',
    },
  });
}
