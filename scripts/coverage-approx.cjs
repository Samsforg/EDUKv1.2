const fs = require("fs");
const s = fs.readFileSync(".next/server/app/index.html", "utf8");
const st = s.match(/<style[^>]*>([\s\S]*?)<\/style>/)[1];
const classes = new Set();
for (const m of s.matchAll(/class="([^"]+)"/g)) for (const c of m[1].split(/\s+/)) classes.add(c);
console.log("unique classes in HTML:", classes.size);
const rules = [];
let i = 0, n = st.length;
while (i < n) {
  const b = st.indexOf("{", i);
  if (b < 0) break;
  let depth = 1, j = b + 1;
  while (j < n && depth > 0) { if (st[j] === "{") depth++; if (st[j] === "}") depth--; j++; }
  const sel = st.slice(i, b).trim();
  const body = st.slice(b + 1, j - 1);
  if (!sel.startsWith("@")) rules.push({ sel, body });
  i = j;
}
console.log("style rules:", rules.length);
const tags = new Set(["body","html","h1","h2","h3","h4","h5","h6","p","a","ul","ol","li","button","input","img","span","div","form","table","tr","td","th","nav","footer","header","section","main","strong","em","br","label","select","option","textarea","svg","path","g","iframe","video","audio","source","picture","figure","figcaption","blockquote","pre","code","hr","dl","dt","dd","aside","article","summary","details","canvas","input","cite","sup","sub","small","time","mark","i","b","u","abbr","address","area","audio","bdi","bdo","caption","col","colgroup","data","datalist","del","fieldset","kbd","legend","map","menu","meter","noscript","object","optgroup","output","progress","q","rp","rt","ruby","s","samp","slot","tbody","tfoot","thead","track","var","wbr"]);
function matches(sel) {
  const parts = sel.split(/[,>+~]/).map((p) => p.trim());
  let any = false;
  for (const p of parts) {
    if (!p) continue;
    if (/^[a-z][a-z0-9]*$/.test(p) && tags.has(p)) { any = true; continue; }
    if (p.startsWith(".")) {
      const cn = p.slice(1).split(/[.:#[]/)[0].replace(/\\/g, "");
      if (cn && (classes.has(cn) || classes.has(cn.replace(/_/g, " ")))) { any = true; continue; }
    }
    if (p.startsWith("#")) { any = true; continue; }
    if (p.startsWith(":") || p.startsWith("[")) { continue; }
    if (p.includes("(")) { any = true; continue; }
  }
  return any;
}
let used = 0, bytes = 0;
const unused = [];
for (const r of rules) {
  if (matches(r.sel)) { used++; bytes += r.sel.length + r.body.length; }
  else if (r.body.length > 50) unused.push({ sel: r.sel.slice(0, 70), len: r.body.length });
}
console.log("rules matching HTML:", used, "/", rules.length);
console.log("matched bytes:", (bytes / 1024).toFixed(1), "KiB of", (st.length / 1024).toFixed(1), "KiB");
unused.sort((a, b) => b.len - a.len);
console.log("largest unused rules:");
for (const u of unused.slice(0, 25)) console.log("  ", (u.len / 1024).toFixed(1).padStart(6) + "KiB", u.sel);
