const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/imports/Profile.tsx');
let content = fs.readFileSync(filePath, 'utf8');

content = content.replace(/font-\['Sigmar:Regular',sans-serif\]/g, "font-['Sigmar',sans-serif] font-normal");
content = content.replace(/font-\['Shantell_Sans:SemiBold',sans-serif\]/g, "font-['Shantell_Sans',sans-serif] font-semibold");
content = content.replace(/font-\['Shantell_Sans:Medium',sans-serif\]/g, "font-['Shantell_Sans',sans-serif] font-medium");
content = content.replace(/font-\['Staatliches:Regular',sans-serif\]/g, "font-['Staatliches',sans-serif] font-normal");
content = content.replace(/font-\['Staatliches:Regular','Noto_Sans:Regular',sans-serif\]/g, "font-['Staatliches','Noto_Sans',sans-serif] font-normal");

fs.writeFileSync(filePath, content, 'utf8');
console.log('Done');