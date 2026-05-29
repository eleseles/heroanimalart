import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const TOKEN = 'polar_oat_13lHah0boGAt0mtNFDqeQF8qJTjJpAaFNNlUS2McJpP';

async function run() {
  console.log('🚀 Connecting to Polar.sh API...');
  
  // 1. Fetch Organization ID (to ensure token is active and valid)
  const orgsRes = await fetch('https://api.polar.sh/v1/organizations/', {
    headers: { 'Authorization': `Bearer ${TOKEN}` }
  });
  
  if (!orgsRes.ok) {
    const errorText = await orgsRes.text();
    console.error('❌ Failed to fetch organizations:', errorText);
    return;
  }
  
  const orgsData = await orgsRes.json();
  const org = orgsData.items?.[0];
  if (!org) {
    console.error('❌ No organizations found on your Polar account.');
    return;
  }
  
  console.log(`✅ Found Organization: "${org.name}" (ID: ${org.id})`);
  
  // 2. Load our current products data
  const productsFile = join(__dirname, '..', 'src', 'data', 'products.ts');
  const originalContent = readFileSync(productsFile, 'utf-8');
  
  // Extract the array from TypeScript
  const arrayMatch = originalContent.match(/export const products:\s*Product\[\]\s*=\s*(\[[\s\S]*\]);?\s*$/m);
  if (!arrayMatch) {
    console.error('❌ Could not parse products.ts array');
    return;
  }
  
  const products = JSON.parse(arrayMatch[1]);
  console.log(`📦 Loaded ${products.length} products from local database...`);
  
  const updatedProducts = [];
  
  for (const product of products) {
    const originalPrice = product.originalPrice || product.price;
    const discountedPrice = Math.round(originalPrice * 0.8 * 100) / 100; // 20% off
    
    console.log(`⏳ Updating Polar product: "${product.name.substring(0, 40)}..."`);
    console.log(`   Price: $${originalPrice.toFixed(2)} ➡️ $${discountedPrice.toFixed(2)}`);
    
    if (product.polarProductId) {
      // Call PATCH https://api.polar.sh/v1/products/{id}
      const body = {
        prices: [
          {
            amount_type: 'fixed',
            price_currency: 'usd',
            price_amount: Math.round(discountedPrice * 100) // in cents
          }
        ]
      };
      
      const productRes = await fetch(`https://api.polar.sh/v1/products/${product.polarProductId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${TOKEN}`
        },
        body: JSON.stringify(body)
      });
      
      if (!productRes.ok) {
        const errText = await productRes.text();
        console.error(`   ❌ Failed to sync with Polar.sh API:`, errText);
      } else {
        console.log(`   ✅ Synced successfully with Polar.sh!`);
      }
    } else {
      console.warn(`   ⚠️ Warning: No polarProductId found. Updating locally only.`);
    }
    
    updatedProducts.push({
      ...product,
      price: discountedPrice,
      originalPrice: originalPrice
    });
    
    // Throttle requests slightly to avoid rate limit issues
    await new Promise(r => setTimeout(r, 400));
  }
  
  // 3. Write updated data back to products.ts
  const updatedArrayStr = JSON.stringify(updatedProducts, null, 2);
  const newContent = originalContent.replace(
    /export const products:\s*Product\[\]\s*=\s*\[[\s\S]*\];?\s*$/m,
    `export const products: Product[] = ${updatedArrayStr};`
  );
  
  writeFileSync(productsFile, newContent, 'utf-8');
  console.log('\n🎉 ALL PRODUCTS SUCCESSFULLY UPDATED!');
  console.log('📁 Updated src/data/products.ts with discounted prices and original prices.');
}

run();
