const fs = require("fs");
const path = require("path");
const manifest = fs
  .readFileSync(path.join(__dirname, "lib-async-names.txt"), "utf8")
  .split(/\r?\n/)
  .map((s) => s.trim())
  .filter(Boolean);
const alt = [...manifest, "queryOne", "query", "run"].sort((a, b) => b.length - a.length).join("|");

const files = process.argv.slice(2);
let wrappedFiles = 0;
const awaitRe = new RegExp("^(" + alt + ")(?:<[^>]*>)?");

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
    if (
      c === "a" &&
      src.slice(i, i + 6) === "await " &&
      /[^A-Za-z0-9_$]/.test(src[i - 1] || " ")
    ) {
      const start = i;
      let j = i + 6;
      while (j < n && /\s/.test(src[j])) j++;
      const m = awaitRe.exec(src.slice(j));
      if (m) {
        const balStart = j + m[0].length;
        if (src[balStart] === "(") {
          let k = balStart;
          let depth = 0;
          while (k < n) {
            const ck = src[k];
            if (ck === "'" || ck === '"') {
              const save = i;
              i = k;
              skipString(ck);
              k = i;
              i = save;
              continue;
            }
            if (ck === "`") {
              const save = i;
              i = k;
              skipTemplate();
              k = i;
              i = save;
              continue;
            }
            if (ck === "(") depth++;
            else if (ck === ")") {
              depth--;
              if (depth === 0) {
                k++;
                break;
              }
            }
            k++;
          }
          const after = src.slice(k);
          const m2 = /^(\s*)(\?\.|!\.|!\[|\.(?!then\b|catch\b|finally\b)[A-Za-z_][A-Za-z0-9_]*)/.exec(after);
          if (m2) {
            out += "(" + src.slice(start, k) + ")" + m2[1] + m2[2];
            i = k + m2[1].length + m2[2].length;
            continue;
          }
        }
      }
      out += src.slice(i, i + 1);
      i++;
      continue;
    }
    out += c;
    i++;
  }
  return out;
}

for (const file of files) {
  const src = fs.readFileSync(file, "utf8");
  const out = transform(src);
  if (out !== src) {
    fs.writeFileSync(file, out);
    wrappedFiles++;
  }
}
console.log("wrapped in " + wrappedFiles + " files");
