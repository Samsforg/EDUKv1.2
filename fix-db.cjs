const fs = require("fs");
const file = "src/lib/db.ts";
const s = fs.readFileSync(file, "utf8");
const start = s.indexOf("export function toPgPlaceholders");
const end = s.indexOf("}\r\n\r\nexport function toPgSchema");
const old = s.slice(start, end + 1);
if (old.length < 50) { console.error("boundary not found"); process.exit(1); }
const fixed = `export function toPgPlaceholders(sql: string): string {
  let out = "";
  let i = 0;
  let j = 1;
  const n = sql.length;
  while (i < n) {
    const c = sql[i];
    if (c === "'") {
      out += c;
      i++;
      while (i < n) {
        if (sql[i] === "\\\\") {
          out += sql[i] + sql[i + 1];
          i += 2;
          continue;
        }
        if (sql[i] === "'") {
          out += sql[i];
          i++;
          if (sql[i] === "'") {
            out += sql[i];
            i++;
            continue;
          }
          break;
        }
        out += sql[i];
        i++;
      }
      continue;
    }
    if (c === "?") {
      out += "$" + j;
      j++;
    } else {
      out += c;
    }
    i++;
  }
  return out;
}`;
const out = s.slice(0, start) + fixed + s.slice(end + 1);
fs.writeFileSync(file, out);
console.log("db.ts toPgPlaceholders fixed");
