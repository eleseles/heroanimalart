import csv
import json
import re

OLD_CSV = '/Users/eles/Downloads/EtsyListingsDownload.csv'
NEW_CSV = '/Users/eles/Downloads/HeroAnimalArt/EtsyListingsDownload.csv'
PRODUCTS_TS = '/Users/eles/Downloads/HeroAnimalArt/src/data/products.ts'

TRY_TO_USD = 46.0
DISCOUNT_RATE = 0.20


def make_slug(title):
    slug = title.lower()
    slug = re.sub(r'[^a-z0-9]+', '-', slug)
    slug = slug.strip('-')
    return slug[:100].rstrip('-')


def parse_csv(path):
    rows = []
    with open(path, encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            rows.append(row)
    return rows


old_rows = parse_csv(OLD_CSV)
new_rows = parse_csv(NEW_CSV)

old_titles = {r['TITLE'].strip() for r in old_rows}
new_products = [r for r in new_rows if r['TITLE'].strip() not in old_titles]

print(f"Eklenecek yeni ürün sayısı: {len(new_products)}")

with open(PRODUCTS_TS, 'r', encoding='utf-8') as f:
    content = f.read()

last_id_match = re.findall(r'"id":\s*"(\d+)"', content)
next_id = int(last_id_match[-1]) + 1 if last_id_match else 1

new_entries = []
for row in new_products:
    title = row['TITLE'].strip()
    description = row['DESCRIPTION'].strip()
    price_try = float(row['PRICE']) if row['PRICE'] else 0
    price_usd = round(price_try / TRY_TO_USD, 2)
    original_price_usd = round(price_usd / (1 - DISCOUNT_RATE), 2)

    images = []
    for i in range(1, 11):
        img = row.get(f'IMAGE{i}', '').strip()
        if img:
            images.append(img)

    tags = [t.strip() for t in row['TAGS'].split(',') if t.strip()]

    entry = {
        "id": str(next_id),
        "slug": make_slug(title),
        "name": title,
        "category": "Poster Design",
        "price": price_usd,
        "currency": "USD",
        "image": images[0] if images else "",
        "images": images,
        "tags": tags,
        "description": description,
        "publishedAt": "JUN 18, 2026",
        "modifiedAt": "JUN 18, 2026",
        "originalPrice": original_price_usd,
    }
    new_entries.append(entry)
    next_id += 1

closing = "];"
insert_pos = content.rfind(closing)

new_json_parts = []
for entry in new_entries:
    new_json_parts.append("  " + json.dumps(entry, ensure_ascii=False, indent=2).replace('\n', '\n  '))

new_content = (
    content[:insert_pos].rstrip()
    + ",\n"
    + ",\n".join(new_json_parts)
    + "\n];"
)

with open(PRODUCTS_TS, 'w', encoding='utf-8') as f:
    f.write(new_content)

print(f"✓ {len(new_entries)} yeni ürün products.ts dosyasına eklendi.")
print(f"  ID aralığı: {int(new_entries[0]['id'])} - {int(new_entries[-1]['id'])}")
