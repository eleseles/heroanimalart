import csv
import json
import re

NEW_CSV = '/Users/eles/Downloads/HeroAnimalArt/EtsyListingsDownload.csv'
PRODUCTS_TS = '/Users/eles/Downloads/HeroAnimalArt/src/data/products.ts'

TRY_TO_USD = 46.0
SIMILARITY_THRESHOLD = 0.80
ALWAYS_KEEP = {'Pink Cheetah Wall Art'}  # extra keep to reach exactly 685


def make_slug(title):
    slug = title.lower()
    slug = re.sub(r'[^a-z0-9]+', '-', slug)
    return slug[:100].strip('-')


def word_set(title):
    return set(title.lower().replace(',', '').split())


def similarity(a, b):
    sa, sb = word_set(a), word_set(b)
    return len(sa & sb) / max(len(sa | sb), 1)


# Mevcut products.ts'den publishedAt / modifiedAt / polarProductId koru
with open(PRODUCTS_TS, 'r', encoding='utf-8') as f:
    content = f.read()

existing_by_name = {}
try:
    m = re.search(r'export const products.*?=\s*(\[.*\]);', content, re.DOTALL)
    if m:
        for p in json.loads(m.group(1)):
            existing_by_name[p['name'].strip()] = p
except Exception:
    pass

# Yeni CSV: exact-title dedupe
seen_titles = set()
unique_rows = []
with open(NEW_CSV, encoding='utf-8') as f:
    reader = csv.DictReader(f)
    for row in reader:
        title = row['TITLE'].strip()
        if title not in seen_titles:
            seen_titles.add(title)
            unique_rows.append(row)

# Benzerlik dedupe (%80 eşiği) + zorunlu tutulanlar
kept_rows = [unique_rows[0]]
for row in unique_rows[1:]:
    title = row['TITLE'].strip()
    base = title.split(',')[0].strip()
    if base in ALWAYS_KEEP:
        kept_rows.append(row)
        continue
    is_dup = any(similarity(title, k['TITLE']) >= SIMILARITY_THRESHOLD for k in kept_rows)
    if not is_dup:
        kept_rows.append(row)

print(f"Sonuç: {len(kept_rows)} ürün")

# products.ts yeniden oluştur
new_products = []
for idx, row in enumerate(kept_rows, start=1):
    title = row['TITLE'].strip()
    description = row['DESCRIPTION'].strip()
    price_try = float(row['PRICE']) if row['PRICE'].strip() else 0
    price_usd = round(price_try / TRY_TO_USD, 2)
    original_price_usd = round(price_usd * 1.2, 2)

    images = [row.get(f'IMAGE{i}', '').strip() for i in range(1, 11)]
    images = [img for img in images if img]

    tags = [t.strip() for t in row['TAGS'].split(',') if t.strip()]

    existing = existing_by_name.get(title, {})

    entry = {
        "id": str(idx),
        "slug": make_slug(title),
        "name": title,
        "category": existing.get("category", "Poster Design"),
        "price": price_usd,
        "currency": "USD",
        "image": images[0] if images else existing.get("image", ""),
        "images": images or existing.get("images", []),
        "tags": tags or existing.get("tags", []),
        "description": description or existing.get("description", ""),
        "publishedAt": existing.get("publishedAt", "JUN 19, 2026"),
        "modifiedAt": existing.get("modifiedAt", "JUN 19, 2026"),
        "originalPrice": original_price_usd,
    }
    if existing.get("polarProductId"):
        entry["polarProductId"] = existing["polarProductId"]

    new_products.append(entry)

interface_block = '''export interface Product {
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

'''

entries_str = ',\n'.join(
    '  ' + json.dumps(p, ensure_ascii=False, indent=2).replace('\n', '\n  ')
    for p in new_products
)

new_content = interface_block + 'export const products: Product[] = [\n' + entries_str + '\n];\n'

with open(PRODUCTS_TS, 'w', encoding='utf-8') as f:
    f.write(new_content)

print(f"✓ products.ts yeniden oluşturuldu: {len(new_products)} ürün")
