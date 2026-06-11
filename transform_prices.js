const fs = require('fs');

const path = 'src/data/products.ts';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(/"price":\s*([\d.]+)/g, (match, p1) => {
    return `"price": ${Number((parseFloat(p1) / 46).toFixed(2))}`;
});

content = content.replace(/"originalPrice":\s*([\d.]+)/g, (match, p1) => {
    return `"originalPrice": ${Number((parseFloat(p1) / 46).toFixed(2))}`;
});

content = content.replace(/"currency":\s*"TRY"/g, `"currency": "USD"`);

fs.writeFileSync(path, content);
console.log("Updated prices to USD.");
