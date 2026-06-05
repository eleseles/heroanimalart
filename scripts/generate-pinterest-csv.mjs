/**
 * Pinterest 2. Görsel CSV Üretici
 * 
 * Tüm ürünler için 2. görselleri kullanarak (images[1])
 * özgün başlık, açıklama ve hashtag'ler içeren tek bir büyük CSV dosyası üretir.
 * 
 * Kullanım:
 *   node scripts/generate-pinterest-csv.mjs
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ─── Config ───
const DOMAIN = 'https://greatwooden.com';

// Pinterest'in beklediği kesin başlık isimleri
const CSV_HEADERS = ['Title', 'Description', 'Link', 'Media URL', 'Pinterest board'];

// Board mapping - ürün kategorisine göre board atama
const BOARD_MAP = {
  'Santa Sleigh Plan': 'DIY Woodworking Plans',
  'welcome planter diy': 'Outdoor Projects & Garden',
  'welcome planter': 'Outdoor Projects & Garden',
  'mud kitchen plans': 'Kids & Family Builds',
  'Humidor Cabinet Plan': 'Home Furniture Blueprints',
  'floor rocking chair': 'Home Furniture Blueprints',
  'Laser Cut Files': 'DIY Woodworking Plans',
  'Lego Table Plans': 'Kids & Family Builds',
  'chapel wedding arch': 'Event & Wedding Decor',
  'DIY Fence Plan': 'Outdoor Projects & Garden',
  'DIY Plans': 'DIY Woodworking Plans',
  'Custom food cart': 'Mobile Bar & Food Cart Ideas',
  'Wooden Rocking Horse': 'Kids & Family Builds',
  'Wheelie Bin Storage': 'Outdoor Projects & Garden',
  'woodworking plans': 'DIY Woodworking Plans',
  'Lemonade Stand DIY': 'Mobile Bar & Food Cart Ideas',
  'DIY Farmstand': 'Mobile Bar & Food Cart Ideas',
  'Lean to Plans': 'Outdoor Projects & Garden',
  'tiered plant stand': 'Outdoor Projects & Garden',
  'outdoor cabinet': 'Workshop & Garage',
  'Adirondack Chair': 'Outdoor Projects & Garden',
  'Wine Rack Plans': 'Home Furniture Blueprints',
  'Shoe Rack Plans': 'Home Furniture Blueprints',
  'Bookshelf Plans': 'Home Furniture Blueprints',
  'Kitchen Island': 'Home Furniture Blueprints',
  'Pergola Plans': 'Outdoor Projects & Garden',
  'Chicken Coop': 'Outdoor Projects & Garden',
  'Dog House Plans': 'Outdoor Projects & Garden',
  'Playhouse Plans': 'Kids & Family Builds',
  'Shed Plans': 'Workshop & Garage',
  'Workbench Plans': 'Workshop & Garage',
  'Carpenter Bee Trap': 'Outdoor Projects & Garden',
  'Christmas': 'DIY Woodworking Plans',
};

const DEFAULT_BOARD = 'DIY Woodworking Plans';

// Hashtag pools per board
const HASHTAGS = {
  'DIY Woodworking Plans': ['#DIY', '#Woodworking', '#WoodworkingPlans', '#BuildItYourself', '#DIYProjects', '#WoodCraft'],
  'Outdoor Projects & Garden': ['#OutdoorDIY', '#GardenDesign', '#BackyardProject', '#OutdoorLiving', '#Landscaping', '#GardenDecor'],
  'Kids & Family Builds': ['#KidsProject', '#DIYKids', '#Montessori', '#PlayroomIdeas', '#KidsFurniture', '#FamilyDIY'],
  'Event & Wedding Decor': ['#WeddingDIY', '#WeddingDecor', '#RusticWedding', '#EventDesign', '#WeddingArch', '#DIYWedding'],
  'Mobile Bar & Food Cart Ideas': ['#MobileBar', '#FoodCart', '#EventBusiness', '#StreetFood', '#BarCart', '#VendorCart'],
  'Home Furniture Blueprints': ['#FurnitureDIY', '#HomeFurniture', '#WoodFurniture', '#BedroomDecor', '#HomeDesign', '#InteriorDIY'],
  'Workshop & Garage': ['#Workshop', '#GarageOrganization', '#ToolStorage', '#ShopSetup', '#Maker', '#WorkshopLife'],
};

// ─── Load Products ───
function loadProducts() {
  const productsPath = join(__dirname, '..', 'src', 'data', 'products.ts');
  const content = readFileSync(productsPath, 'utf-8');
  
  // Extract the array from TypeScript
  const arrayMatch = content.match(/export const products:\s*Product\[\]\s*=\s*(\[[\s\S]*\]);?\s*$/m);
  if (!arrayMatch) {
    throw new Error('Could not parse products.ts');
  }
  
  return JSON.parse(arrayMatch[1]);
}

// ─── Get Board for Product ───
function getBoard(product) {
  return BOARD_MAP[product.category] || DEFAULT_BOARD;
}

// ─── Clean Title Parts ───
function cleanTitlePart(str) {
  return str
    .replace(/\b(plans|plan|pdf|blueprint|build guide|diy|guide|woodworking)\b/gi, '')
    .replace(/\s+/g, ' ')
    .trim();
}

// ─── Generate unique title for 2nd Pin ───
function generateSecondPinTitle(product) {
  const parts = product.name.split('|').map(p => p.trim());
  let coreName = '';
  
  if (parts.length > 1) {
    coreName = cleanTitlePart(parts[1]);
  } else {
    coreName = cleanTitlePart(parts[0]);
  }
  
  // Ensure we capitalised first letter of key words nicely
  return `How to Build: ${coreName} (Woodworking Plans & Cut List)`.substring(0, 100);
}

// ─── Generate unique description for 2nd Pin ───
function generateSecondPinDescription(product, board) {
  const coreName = product.name.split('|')[0]
    .replace(/\b(plans|plan|pdf|blueprint|build guide|diy|guide)\b/gi, '')
    .replace(/\s+/g, ' ')
    .trim();
  
  const intro = `Learn how to build your own ${coreName.toLowerCase()} with these step-by-step woodworking plans. Perfect for DIY enthusiasts and makers!`;
  
  const packageDetails = `\n\nWhat you get in this PDF download:\n- Step-by-step 3D assembly instructions\n- Complete material & hardware shopping list\n- Optimized cutting diagrams to save on lumber\n- Full dimensions (Imperial & Metric)`;
  
  // Pick random hashtags
  const pool = HASHTAGS[board] || HASHTAGS['DIY Woodworking Plans'];
  const shuffled = [...pool].sort(() => 0.5 - Math.random());
  const tags = "\n\n" + shuffled.slice(0, 4).join(' ');
  
  const full = `${intro}${packageDetails}${tags}`;
  return full.substring(0, 500);
}

// ─── CSV escape ───
function csvEscape(str) {
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return `"${str}"`;
}

// ─── Main ───
function main() {
  const products = loadProducts();
  console.log(`📦 Toplam ${products.length} ürün yüklendi. 2. görseller için CSV üretiliyor...`);
  
  // Generate CSV
  let csv = CSV_HEADERS.join(',') + '\n';
  let successCount = 0;
  
  products.forEach(product => {
    // 2. görseli seç (images[1] varsa al, yoksa fallback olarak image veya images[0])
    const mediaUrl = product.images && product.images[1] ? product.images[1] : (product.image || product.images[0]);
    
    if (!mediaUrl) {
      console.warn(`⚠️ Warning: No image found for product ID ${product.id}`);
      return;
    }
    
    const board = getBoard(product);
    const uniqueTitle = generateSecondPinTitle(product);
    const description = generateSecondPinDescription(product, board);
    const destUrl = `${DOMAIN}/products/${product.slug}`; // slug tabanlı yönlendirme daha SEO dostu
    
    csv += `${csvEscape(uniqueTitle)},${csvEscape(description)},${csvEscape(destUrl)},${csvEscape(mediaUrl)},${csvEscape(board)}\n`;
    successCount++;
  });
  
  // Save to output directory
  const outputDir = join(__dirname, '..', 'pinterest_csv');
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }
  
  const filename = `pinterest_2nd_images_all.csv`;
  const outputPath = join(outputDir, filename);
  
  writeFileSync(outputPath, csv, 'utf-8');
  
  console.log(`\n📌 Pinterest CSV Üretildi!`);
  console.log(`──────────────────────────`);
  console.log(`📁 Dosya: pinterest_csv/${filename}`);
  console.log(`📦 İşlenen Ürün: ${successCount} adet (2. görselleriyle)`);
  console.log(`🚀 Link yapısı: SEO dostu slug kullanıldı (https://greatwooden.com/products/[slug])`);
  console.log(`\n📋 Örnek Satırlar:`);
  
  const lines = csv.split('\n');
  console.log(lines[0]); // Header
  if (lines[1]) console.log(lines[1]); // Row 1
  if (lines[2]) console.log(lines[2]); // Row 2
  
  console.log(`\n🚀 Sonraki adım:`);
  console.log(`   1. Pinterest → Create → Create Pins → Upload CSV`);
  console.log(`   2. "pinterest_csv/${filename}" dosyasını yükle`);
  console.log(`   3. Taslaklardan (Drafts) zaman planlaması yaparak yayına al.`);
}

main();
