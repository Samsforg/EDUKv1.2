const fs = require("fs");
const path = require("path");
const manifest = fs
  .readFileSync(path.join(__dirname, "lib-async-names.txt"), "utf8")
  .split(/\r?\n/)
  .map((s) => s.trim())
  .filter(Boolean);
const alt = [...manifest, "queryOne", "query", "run"].sort((a, b) => b.length - a.length).join("|");
const callRe = new RegExp("^(" + alt + ")(<[^<>]*>)?\\(");
const KW = new Set(["return","throw","typeof","void","delete","new","in","instanceof","await","yield","do","else","if","for","while","case","catch","finally","try","of","as","async"]);

const src = fs.readFileSync("src/lib/report.ts", "utf8");
let i = 0;
const n = src.length;
let lastMatch = -1;
function skipString(quote) {
  i++;
  while (i < n) {
    if (src[i] === "\\") { i += 2; continue; }
    if (src[i] === quote) {
      if (src[i + 1] === quote) { i += 2; continue; }
      i++;
      return;
    }
    i++;
  }
}
function skipTemplate() {
  i++;
  while (i < n) {
    if (src[i] === "\\") { i += 2; continue; }
    if (src[i] === "`") { i++; return; }
    if (src[i] === "$" && src[i + 1] === "{") {
      i += 2;
      let depth = 1;
      while (i < n && depth > 0) {
        const c = src[i];
        if (c === "\\") { i += 2; continue; }
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
  if (c === "'" || c === '"') { skipString(c); continue; }
  if (c === "`") { skipTemplate(); continue; }
  const m = callRe.exec(src.slice(i));
  if (m) {
    lastMatch = i;
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
        console.log("MATCH at", i, "->", src.slice(i, i + 30));
      }
    }
  }
  i++;
}
console.log("lastMatch:", lastMatch, "n:", n);
const pos = src.indexOf("getAdminStats()");
console.log("getAdminStats() at:", pos);
if (lastMatch < pos) {
  console.log("--- context around end of scanning:");
  console.log(JSON.stringify(src.slice(lastMatch, lastMatch + 200)));
}
