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
  }

  function skipTemplate() {
    i++;
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
        i += 2;
        let depth = 1;
        while (i < n && depth > 0) {
          const c = src[i];
          if (c === "\\") {
            i += 2;
            continue;
          }
          if (c === "{") depth++;
          else if (c === "}") depth--;
          i++;
        }
        continue;
      }
      i++;
    }
  }

  while (i < n) {
    const c = src[i];
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
    if (c === "/" && src[i + 1] !== "/" && src[i + 1] !== "*") {
      let j = i - 1;
      while (j >= 0 && /\s/.test(src[j])) j--;
      const prev = src[j];
      let kw = "";
      if (prev && /[A-Za-z0-9_$]/.test(prev)) {
        let k = j;
        while (k >= 0 && /[A-Za-z0-9_$]/.test(src[k])) k--;
        kw = src.slice(k + 1, j + 1);
      }
      const regexStart =
        prev === undefined ||
        /[=(\\[,{:;!?&|+\-*%<>]/.test(prev || "") ||
        ["return","typeof","case","do","else","in","instanceof","new","of","void","yield","await","delete","throw"].includes(kw);
      if (regexStart) {
        const s = i;
        i++;
        while (i < n) {
          if (src[i] === "\\") { i += 2; continue; }
          if (src[i] === "/") { i++; break; }
          if (src[i] === "\n" || src[i] === "\r") break;
          i++;
        }
        out += src.slice(s, i);
        continue;
      }
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
        if (addAwait && src.slice(Math.max(0, i - 6), i) !== "await ") {
          out += "await " + src.slice(i, i + m[0].length);
          i += m[0].length;
          total++;
          continue;
        }
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
