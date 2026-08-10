const fs = require("fs");
const s = fs.readFileSync("src/lib/admin.ts", "utf8");
const n = s.length;
let i = 0;
let state = "code";
const issues = [];
while (i < n) {
  const c = s[i];
  const next = s[i + 1];
  if (state === "code") {
    if (c === "/" && next === "/") {
      i = s.indexOf("\n", i);
      if (i < 0) break;
      i++;
      continue;
    }
    if (c === "/" && next === "*") {
      i = s.indexOf("*/", i + 2);
      if (i < 0) {
        issues.push("unclosed block comment at " + i);
        break;
      }
      i += 2;
      continue;
    }
    if (c === '"' || c === "'") {
      const q = c;
      i++;
      while (i < n) {
        if (s[i] === "\\") {
          i += 2;
          continue;
        }
        if (s[i] === q) {
          i++;
          break;
        }
        i++;
      }
      continue;
    }
    if (c === "`") {
      state = "template";
      i++;
      continue;
    }
    i++;
  } else if (state === "template") {
    if (c === "\\") {
      i += 2;
      continue;
    }
    if (c === "`") {
      state = "code";
      i++;
      continue;
    }
    if (c === "$" && next === "{") {
      i += 2;
      let d = 1;
      while (i < n && d > 0) {
        const c2 = s[i];
        const next2 = s[i + 1];
        if (c2 === "/" && next2 === "/") {
          i = s.indexOf("\n", i);
          continue;
        }
        if (c2 === "'" || c2 === '"') {
          const q = c2;
          i++;
          while (i < n) {
            if (s[i] === "\\") {
              i += 2;
              continue;
            }
            if (s[i] === q) {
              i++;
              break;
            }
            i++;
          }
          continue;
        }
        if (c2 === "`") {
          state = "template";
          i++;
          continue;
        }
        if (c2 === "{") d++;
        if (c2 === "}") d--;
        i++;
      }
      continue;
    }
    i++;
  }
}
console.log("Final state:", state, "i:", i, "of", n);
console.log("Issues:", issues);
