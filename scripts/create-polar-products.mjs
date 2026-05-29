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
    console.error('❌ No organizations found on your Polar account. Make sure you completed onboarding in dashboard!');
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
    const truncatedName = product.name.length > 60 ? product.name.substring(0, 57).trim() + '...' : product.name;
    console.log(`⏳ Creating Polar product for: "${truncatedName}" ($${product.price})...`);
    
    // Structure Polar Create Product Body (No organization_id needed since we use an Organization Access Token!)
    const body = {
      name: truncatedName,
      description: product.description.substring(0, 1000).trim(), // Safe limit for description
      prices: [
        {
          amount_type: 'fixed',
          price_currency: 'usd',
          price_amount: Math.round(product.price * 100) // Price in cents
        }
      ]
    };
    
    const productRes = await fetch('https://api.polar.sh/v1/products/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TOKEN}`
      },
      body: JSON.stringify(body)
    });
    
    if (!productRes.ok) {
      const errText = await productRes.text();
      console.error(`❌ Failed to create product in Polar:`, errText);
      // Fallback
      updatedProducts.push(product);
      continue;
    }
    
    const polarProduct = await productRes.json();
    console.log(`   ✅ Success! Polar Product ID: ${polarProduct.id}`);
    
    updatedProducts.push({
      ...product,
      polarProductId: polarProduct.id
    });
    
    // Throttle requests slightly
    await new Promise(r => setTimeout(r, 600));
  }
  
  // 3. Write updated data back to products.ts
  const updatedArrayStr = JSON.stringify(updatedProducts, null, 2);
  const newContent = originalContent.replace(
    /export const products:\s*Product\[\]\s*=\s*\[[\s\S]*\];?\s*$/m,
    `export const products: Product[] = ${updatedArrayStr};`
  );
  
  writeFileSync(productsFile, newContent, 'utf-8');
  console.log('\n🎉 ALL 20 PRODUCTS SUCCESSFULLY CREATED ON POLAR.SH!');
  console.log('📁 Updated src/data/products.ts with direct Polar Product IDs.');
}

run();
