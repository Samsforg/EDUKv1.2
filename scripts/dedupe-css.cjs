#!/usr/bin/env node
// Collapse byte-identical top-level CSS statements, keeping the LAST occurrence.
// Cascade-safe: identical statements produce identical computed styles.
const fs = require("fs");

const file = process.argv[2];
if (!file) {
  console.error("usage: node dedupe-css.cjs <file.css>");
  process.exit(1);
}
const src = fs.readFileSync(file, "utf8");

function splitStatements(input) {
  const stmts = [];
  let i = 0;
  const n = input.length;
  let cur = "";
  while (i < n) {
    const c = input[i];
    if (c === "{") {
      // find matching closing brace (nesting-aware)
      let depth = 1;
      let j = i + 1;
      let inComment = false;
      while (j < n && depth > 0) {
        const ch = input[j];
        if (inComment) {
          if (ch === "*" && input[j + 1] === "/") {
            inComment = false;
            j++;
          }
        } else if (ch === "/" && input[j + 1] === "*") {
          inComment = true;
          j++;
        } else if (ch === "{") {
          depth++;
        } else if (ch === "}") {
          depth--;
        }
        j++;
      }
      const header = cur.trim();
      const body = input.slice(i + 1, j - 1);
      if (header) {
        stmts.push({ text: header + "{" + body + "}", isBrace: true });
      }
      cur = "";
      i = j;
      continue;
    }
    if (c === ";") {
      const t = cur.trim();
      if (t) stmts.push({ text: t + ";", isBrace: false });
      cur = "";
      i++;
      continue;
    }
    cur += c;
    i++;
  }
  const t = cur.trim();
  if (t) stmts.push({ text: t, isBrace: false });
  return stmts;
}

const stmts = splitStatements(src);
const total = stmts.length;
const seen = new Map();
stmts.forEach((s, idx) => seen.set(s.text, idx));
const keep = new Set(seen.values());
let removed = 0;
let removedBytes = 0;
const out = [];
stmts.forEach((s, idx) => {
  if (!keep.has(idx)) {
    removed++;
    removedBytes += Buffer.byteLength(s.text, "utf8");
    return;
  }
  out.push(s.text);
});
const result = out.join("\n");
const before = Buffer.byteLength(src, "utf8");
const after = Buffer.byteLength(result, "utf8");
console.log(
  `statements: ${total} -> ${total - removed} | removed: ${removed} (${(removedBytes / 1024).toFixed(1)} KiB) | css: ${(before / 1024).toFixed(1)} -> ${(after / 1024).toFixed(1)} KiB (${((1 - after / before) * 100).toFixed(1)}%)`
);
for (const [t, idx] of seen) {
  if (t.length > 200 || idx === 0) continue;
}
fs.writeFileSync(file, result);