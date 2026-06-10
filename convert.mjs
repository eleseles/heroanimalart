import fs from 'fs';

function parseCSV(content) {
  const result = [];
  let row = [];
  let inQuotes = false;
  let currentValue = '';
  
  for (let i = 0; i < content.length; i++) {
    const char = content[i];
    const nextChar = content[i+1];
    
    if (char === '"' && inQuotes && nextChar === '"') {
      currentValue += '"';
      i++;
    } else if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      row.push(currentValue);
      currentValue = '';
    } else if ((char === '\n' || (char === '\r' && nextChar === '\n')) && !inQuotes) {
      if (char === '\r') i++; // skip \n
      row.push(currentValue);
      result.push(row);
      row = [];
      currentValue = '';
    } else {
      currentValue += char;
    }
  }
  
  if (currentValue || row.length > 0) {
    row.push(currentValue);
    result.push(row);
  }
  
  return result;
}

const csvContent = fs.readFileSync('/Users/eles/Downloads/HeroAnimalArt/EtsyListingsDownload.csv', 'utf8');
const rows = parseCSV(csvContent);
const headers = rows[0];

const products = [];
for (let i = 1; i < rows.length; i++) {
  const row = rows[i];
  if (row.length < headers.length) continue; 
  
  const title = row[0] || '';
  const description = row[1] || '';
  const price = parseFloat(row[2]) || 0;
  const currency = row[3] || 'TRY';
  const tagsStr = row[5] || '';
  
  const images = [];
  for(let j = 7; j <= 16; j++) {
    if (row[j] && row[j].trim() !== '') {
      images.push(row[j].trim());
    }
  }
  
  if (images.length === 0 || !title) continue;
  
  let slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  if (slug.length > 100) slug = slug.substring(0, 100).replace(/-$/, '');
  
  const tags = tagsStr.split(',').map(t => t.trim()).filter(Boolean);
  
  const product = {
    id: i.toString(),
    slug,
    name: title.replace(/"/g, ''),
    category: "Poster Design",
    price,
    currency,
    image: images[0],
    images,
    tags,
    description: description.replace(/"/g, "'"),
    publishedAt: "MAY 11, 2026",
    modifiedAt: "MAY 29, 2026",
    originalPrice: parseFloat((price * 1.2).toFixed(2))
  };
  
  products.push(product);
}

const fileContent = `export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  currency: string;
  image: string;
  images: string[];
  tags: string[];
  description: string;
  publishedAt: string;
  modifiedAt: string;
  polarProductId?: string;
  originalPrice?: number;
}

export const products: Product[] = ${JSON.stringify(products, null, 2)};
`;

fs.writeFileSync('/Users/eles/Downloads/HeroAnimalArt/src/data/products.ts', fileContent, 'utf8');
console.log('Successfully generated products.ts with ' + products.length + ' products.');
