const fs = require("fs");
const path = require("path");
const manifest = fs
  .readFileSync(path.join(__dirname, "lib-async-names.txt"), "utf8")
  .split(/\r?\n/)
  .map((s) => s.trim())
  .filter(Boolean);
const alt = [...manifest, "queryOne", "query", "run"].sort((a, b) => b.length - a.length).join("|");
const files = process.argv.slice(2);
let total = 0;
const callRe = new RegExp("^(" + alt + ")(<[^<>]*>)?\\(");
const KW = new Set(["return","throw","typeof","void","delete","new","in","instanceof","await","yield","do","else","if","for","while","case","catch","finally","try","of","as","async"]);

function transform(src) {
  let out = "";
  let i = 0;
  const n = src.length;

  function skipString(quote) {
    const start = i;
    i++;
    while (i < n) {
      if (src[i] === "\\") {
        i += 2;
        continue;
      }
      if (src[i] === quote) {
        if (src[i + 1] === quote) {
          i += 2;
          continue;
        }
        i++;
        return;
      }
      i++;
    }
    console.log("SKIPSTRING UNTERMINATED at", start, "quote", quote);
  }

  function skipTemplate() {
    const start = i;
    i++;
    let sawDollar = false;
    while (i < n) {
      if (src[i] === "\\") {
        i += 2;
        continue;
      }
      if (src[i] === "`") {
        i++;
        return;
      }
      if (src[i] === "$" && src[i + 1] === "{") {
        sawDollar = true;
        i += 2;
        let depth = 1;
        while (i < n && depth > 0) {
          const c = src[i];
          if (c === "'" || c === '"') skipString(c);
          else if (c === "`") skipTemplate();
          else if (c === "{") depth++;
          else if (c === "}") depth--;
          i++;
        }
        continue;
      }
      i++;
    }
    console.log("SKIPTEMPLATE UNTERMINATED at", start, "sawDollar", sawDollar);
  }

  while (i < n) {
    const c = src[i];
    if (i >= 5000 && i <= 26000 && src[i] === "'" || c === '"' && i >= 5000 && i <= 5200) {
      console.log("CHAR", i, JSON.stringify(src.slice(i, i + 20)));
    }
    if (c === "'" || c === '"') {
      const s = i;
      skipString(c);
      out += src.slice(s, i);
      continue;
    }
    if (c === "`") {
      const s = i;
      skipTemplate();
      out += src.slice(s, i);
      continue;
    }
    if (c === "/" && src[i + 1] === "/") {
      const s = i;
      while (i < n && src[i] !== "\n") i++;
      out += src.slice(s, i);
      continue;
    }
    if (c === "/" && src[i + 1] === "*") {
      const s = i;
      i += 2;
      while (i < n && !(src[i] === "*" && src[i + 1] === "/")) i++;
      i += 2;
      out += src.slice(s, i);
      continue;
    }
    const m = callRe.exec(src.slice(i));
    if (m) {
      let j = i - 1;
      while (j >= 0 && /\s/.test(src[j])) j--;
      const prev = src[j];
      let addAwait = false;
      if (prev !== ".") {
        if (/[A-Za-z0-9_$]/.test(prev || "")) {
          let k = j;
          while (k >= 0 && /[A-Za-z0-9_$]/.test(src[k])) k--;
          const word = src.slice(k + 1, j + 1);
          if (KW.has(word)) addAwait = true;
        } else {
          addAwait = true;
        }
      }
      if (addAwait && src.slice(Math.max(0, i - 6), i) !== "await ") {
        out += "await " + src.slice(i, i + m[0].length);
        i += m[0].length;
        total++;
        continue;
      }
    }
    out += c;
    i++;
  }
  return out;
}

for (const file of files) {
  const src = fs.readFileSync(file, "utf8");
  const out = transform(src);
  if (out !== src) fs.writeFileSync(file, out);
}
console.log("awaits ajoutés: " + total);
