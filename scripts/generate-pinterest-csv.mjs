/**
 * Pinterest Günlük CSV Üretici
 * 
 * Strateji dokümanına (§10) göre her gün 5 ürünlük Pinterest CSV dosyası üretir.
 * Her ürün farklı bir board'a atanır ve özgün açıklama + hashtag içerir.
 * 
 * Kullanım:
 *   node scripts/generate-pinterest-csv.mjs
 *   node scripts/generate-pinterest-csv.mjs --day 3    (3. gün için)
 *   node scripts/generate-pinterest-csv.mjs --batch 2  (2. batch: ürün 6-10)
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ─── Config ───
const DOMAIN = 'https://greatwooden.com';
const PINS_PER_DAY = 5;
const START_DATE = '2026-05-11'; // Isınma başlangıç tarihi

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

// ─── Generate unique description with hashtags ───
function generateDescription(product, board) {
  // Take first 350 chars of description for uniqueness
  let desc = product.description.substring(0, 350).trim();
  
  // Remove trailing incomplete sentence
  const lastPeriod = desc.lastIndexOf('.');
  if (lastPeriod > 200) {
    desc = desc.substring(0, lastPeriod + 1);
  }
  
  // Add hashtags (pick 3 random from the board's pool)
  const pool = HASHTAGS[board] || HASHTAGS['DIY Woodworking Plans'];
  const shuffled = pool.sort(() => 0.5 - Math.random());
  const tags = shuffled.slice(0, 3).join(' ');
  
  // Ensure total length <= 500 chars
  const full = `${desc} ${tags}`;
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
  const args = process.argv.slice(2);
  
  // Parse --batch or --day argument
  let batchNum;
  const batchIdx = args.indexOf('--batch');
  const dayIdx = args.indexOf('--day');
  
  if (batchIdx !== -1 && args[batchIdx + 1]) {
    batchNum = parseInt(args[batchIdx + 1]);
  } else if (dayIdx !== -1 && args[dayIdx + 1]) {
    batchNum = parseInt(args[dayIdx + 1]);
  } else {
    // Auto-calculate from start date
    const start = new Date(START_DATE);
    const today = new Date();
    const diffDays = Math.floor((today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    batchNum = diffDays;
  }
  
  const products = loadProducts();
  const startIdx = (batchNum - 1) * PINS_PER_DAY;
  const endIdx = Math.min(startIdx + PINS_PER_DAY, products.length);
  
  if (startIdx >= products.length) {
    console.log('✅ Tüm ürünler zaten pinlendi! Toplam:', products.length);
    return;
  }
  
  const batch = products.slice(startIdx, endIdx);
  
  // Generate CSV
  let csv = CSV_HEADERS.join(',') + '\n';
  
  batch.forEach(product => {
    const board = getBoard(product);
    const title = product.name.substring(0, 100);
    const destUrl = `${DOMAIN}/products/${product.id}`;
    
    // Her resim için ayrı bir pin oluştur (max 5 resim)
    const imagesToPin = product.images.slice(0, 5);
    
    imagesToPin.forEach((mediaUrl, index) => {
      // Her pin için Başlık ve Açıklamayı benzersiz yapalım
      const variation = index === 0 ? '' : ` - View ${index + 1}`;
      
      // Başlığı 100 karakter sınırına göre kesip son eki ekle
      const uniqueTitle = (product.name.substring(0, 90) + variation).trim();
      const description = generateDescription(product, board) + variation;
      
      csv += `${csvEscape(uniqueTitle)},${csvEscape(description)},${csvEscape(destUrl)},${csvEscape(mediaUrl)},${csvEscape(board)}\n`;
    });
  });
  
  // Save to output directory
  const outputDir = join(__dirname, '..', 'pinterest_csv');
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }
  
  const today = new Date().toISOString().split('T')[0];
  const filename = `pinterest_day${batchNum}_${today}.csv`;
  const outputPath = join(outputDir, filename);
  
  writeFileSync(outputPath, csv, 'utf-8');
  
  console.log(`\n📌 Pinterest CSV Üretildi!`);
  console.log(`──────────────────────────`);
  console.log(`📁 Dosya: pinterest_csv/${filename}`);
  console.log(`📅 Batch: #${batchNum} (Gün ${batchNum})`);
  console.log(`📦 Ürünler: ${startIdx + 1} - ${endIdx} (${batch.length} adet)`);
  console.log(`\n📋 İçerik:`);
  
  batch.forEach(product => {
    const board = getBoard(product);
    console.log(`   • [${board}] ${product.name.substring(0, 60)}...`);
  });
  
  console.log(`\n🚀 Sonraki adım:`);
  console.log(`   1. Pinterest → Create → Create Pins → Upload CSV`);
  console.log(`   2. "${filename}" dosyasını yükle`);
  console.log(`   3. Pin scheduling ile farklı saatlere yay`);
  console.log(`\n⏭️  Yarın için: node scripts/generate-pinterest-csv.mjs --batch ${batchNum + 1}`);
}

main();
