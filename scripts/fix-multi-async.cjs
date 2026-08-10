const fs = require("fs");
const files = process.argv.slice(2);
let total = 0;
for (const file of files) {
  const src = fs.readFileSync(file, "utf8");
  const out = src.replace(/\basync\s+async(?:\s+async)*\b/g, "async");
  if (out !== src) {
    fs.writeFileSync(file, out);
    total++;
    console.log(`fix-multi-async: ${file}`);
  }
}
console.log(`fichiers corrigés: ${total}`);
