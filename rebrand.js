const fs = require('fs');
const path = require('path');

const walk = (dir) => {
    let results = [];
    if (!fs.existsSync(dir)) return results;
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else {
            results.push(file);
        }
    });
    return results;
}

const dirsToSearch = ['src', 'public', 'scripts'];
const rootFiles = ['package.json', 'pinterest_catalog_strategy.md', 'README.md'];
let files = [...rootFiles];
dirsToSearch.forEach(dir => {
    files = files.concat(walk(dir));
});

files.forEach(file => {
    if (file.match(/\.(js|ts|tsx|mjs|json|md|xml|html|css|scss)$/)) {
        let content = fs.readFileSync(file, 'utf8');
        let originalContent = content;
        
        // Replacements
        content = content.replace(/greatwooden\.com/g, 'heroanimalart.com');
        content = content.replace(/Great Wooden/g, 'HeroAnimalArt');
        content = content.replace(/GREAT WOODEN/g, 'HEROANIMALART');
        content = content.replace(/greatwooden/g, 'heroanimalart');
        content = content.replace(/GreatWooden/g, 'HeroAnimalArt');
        
        if (content !== originalContent) {
            fs.writeFileSync(file, content, 'utf8');
            console.log('Updated: ' + file);
        }
    }
});
