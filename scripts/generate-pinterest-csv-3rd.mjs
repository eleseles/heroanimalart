/**
 * Pinterest 3. Görsel CSV Üretici
 *
 * Tüm ürünler için 3. görselleri kullanarak (images[2])
 * özgün başlık, açıklama ve hashtag'ler içeren tek bir büyük CSV dosyası üretir.
 *
 * Kullanım:
 *   node scripts/generate-pinterest-csv-3rd.mjs
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ─── Config ───
const DOMAIN = 'https://heroanimalart.com';

const CSV_HEADERS = ['Title', 'Description', 'Link', 'Media URL', 'Pinterest board'];

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

// ─── Title prefixes pool for 3rd pins ───
const TITLE_PREFIXES = [
  'Weekend Project:',
  'Inside the Plans:',
  'Complete Build Guide —',
  'DIY Blueprint:',
  'Craftsman\'s Choice:',
  'Step-by-Step:',
  'Build From Scratch:',
  'Downloadable Plans:',
];

// ─── Generate unique title for 3rd Pin ───
function generateThirdPinTitle(product, index) {
  const parts = product.name.split('|').map(p => p.trim());
  let coreName = '';

  if (parts.length > 1) {
    coreName = cleanTitlePart(parts[1]);
  } else {
    coreName = cleanTitlePart(parts[0]);
  }

  const prefix = TITLE_PREFIXES[index % TITLE_PREFIXES.length];
  return `${prefix} ${coreName}`.substring(0, 100);
}

// ─── Description intro pool for 3rd pins ───
const DESCRIPTION_INTROS = [
  (name) => `Take a closer look inside these detailed ${name} woodworking plans — everything you need for a clean, professional build.`,
  (name) => `Here's what makes these ${name} plans stand out: clear 3D diagrams, a full cut list, and pro-level detail from start to finish.`,
  (name) => `Ready to start building your ${name}? These instant-download plans walk you through every step with precision measurements.`,
  (name) => `Save time and avoid costly mistakes — our ${name} PDF plans include optimized cutting diagrams and a complete material list.`,
  (name) => `See the difference a well-designed plan makes. Our ${name} blueprints are built for real DIYers who want results.`,
  (name) => `From lumber to final finish — our ${name} woodworking plans cover every detail so you can build with confidence.`,
  (name) => `No guesswork, no wasted wood. These ${name} plans come with step-by-step 3D assembly guides and a hardware checklist.`,
  (name) => `Whether you're a beginner or seasoned woodworker, our ${name} plans give you a clear roadmap to a beautiful finished piece.`,
];

// ─── Generate unique description for 3rd Pin ───
function generateThirdPinDescription(product, board, index) {
  const coreName = product.name.split('|')[0]
    .replace(/\b(plans|plan|pdf|blueprint|build guide|diy|guide)\b/gi, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();

  const introFn = DESCRIPTION_INTROS[index % DESCRIPTION_INTROS.length];
  const intro = introFn(coreName);

  const packageDetails = `\n\nIncludes:\n- Detailed 3D assembly views\n- Cut list with board footage\n- Hardware & materials checklist\n- Imperial & Metric dimensions`;

  const pool = HASHTAGS[board] || HASHTAGS['DIY Woodworking Plans'];
  const shuffled = [...pool].sort(() => 0.5 - Math.random());
  const tags = '\n\n' + shuffled.slice(0, 4).join(' ');

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
  console.log(`📦 Toplam ${products.length} ürün yüklendi. 3. görseller için CSV üretiliyor...`);

  let csv = CSV_HEADERS.join(',') + '\n';
  let successCount = 0;
  let skippedCount = 0;

  products.forEach((product, index) => {
    // 3. görseli seç (images[2] varsa al, yoksa images[1] → images[0] → image)
    const mediaUrl =
      (product.images && product.images[2]) ||
      (product.images && product.images[1]) ||
      (product.images && product.images[0]) ||
      product.image;

    if (!mediaUrl) {
      console.warn(`⚠️  No image found for product ID ${product.id}`);
      skippedCount++;
      return;
    }

    if (!product.images || !product.images[2]) {
      console.warn(`ℹ️  Product "${product.name}" has no images[2], using fallback`);
    }

    const board = getBoard(product);
    const uniqueTitle = generateThirdPinTitle(product, index);
    const description = generateThirdPinDescription(product, board, index);
    const destUrl = `${DOMAIN}/products/${product.slug}`;

    csv += `${csvEscape(uniqueTitle)},${csvEscape(description)},${csvEscape(destUrl)},${csvEscape(mediaUrl)},${csvEscape(board)}\n`;
    successCount++;
  });

  const outputDir = join(__dirname, '..', 'pinterest_csv');
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }

  const filename = `pinterest_3rd_images_all.csv`;
  const outputPath = join(outputDir, filename);

  writeFileSync(outputPath, csv, 'utf-8');

  console.log(`\n📌 Pinterest CSV Üretildi!`);
  console.log(`──────────────────────────`);
  console.log(`📁 Dosya: pinterest_csv/${filename}`);
  console.log(`📦 İşlenen Ürün: ${successCount} adet (3. görselleriyle)`);
  console.log(`⏭️  Atlanan: ${skippedCount} adet`);
  console.log(`🚀 Link yapısı: SEO dostu slug (https://heroanimalart.com/products/[slug])`);
  console.log(`\n📋 Örnek Satırlar:`);

  const lines = csv.split('\n');
  console.log(lines[0]);
  if (lines[1]) console.log(lines[1]);
  if (lines[2]) console.log(lines[2]);

  console.log(`\n🚀 Sonraki adım:`);
  console.log(`   1. Pinterest → Create → Create Pins → Upload CSV`);
  console.log(`   2. "pinterest_csv/${filename}" dosyasını yükle`);
  console.log(`   3. Taslaklardan (Drafts) zaman planlaması yaparak yayına al.`);
}

main();
