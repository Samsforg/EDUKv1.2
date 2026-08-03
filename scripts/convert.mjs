import fs from "node:fs";
import path from "node:path";
import { parse } from "parse5";

const ROOT = path.resolve(import.meta.dirname, "..");
const APP_DIR = ROOT;
const SCREENS_DIR =
  process.env.SCREENS_DIR ||
  path.join(ROOT, "..", "stitch_edukora_ai_learning_platform");
const PAGES_DIR = path.join(APP_DIR, "src", "app");
const IMAGES_DIR = path.join(APP_DIR, "public", "images");

const ACCENTS = {
  é: "e", è: "e", ê: "e", ë: "e", à: "a", â: "a", ä: "a", ç: "c",
  î: "i", ï: "i", ô: "o", ö: "o", ù: "u", û: "u", ü: "u", ã: "a", ñ: "n",
};

function slugify(name) {
  const slug = name
    .toLowerCase()
    .split("")
    .map((c) => ACCENTS[c] || c)
    .join("")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return slug || "ecran";
}

const VOID = new Set([
  "area", "base", "br", "col", "embed", "hr", "img", "input", "link",
  "meta", "param", "source", "track", "wbr",
  "circle", "ellipse", "line", "path", "polygon", "polyline", "rect", "stop", "use",
]);

const BOOL_ATTRS = new Set(["disabled", "checked", "selected", "readonly", "multiple", "required", "autofocus", "hidden", "open", "controls", "loop", "muted", "playsinline", "download"]);

const NUMERIC_ATTRS = new Map([
  ["maxlength", "maxLength"], ["minlength", "minLength"], ["tabindex", "tabIndex"],
  ["rows", "rows"], ["cols", "cols"], ["size", "size"], ["rowspan", "rowSpan"],
  ["colspan", "colSpan"], ["span", "span"], ["max", "max"], ["min", "min"], ["step", "step"],
]);

function camelAttr(name) {
  if (name.startsWith("data-") || name.startsWith("aria-") || name.startsWith("xmlns")) return name;
  if (name.includes("-")) return name.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
  return name;
}

function cssToObject(css) {
  const obj = {};
  for (const decl of css.split(";")) {
    const idx = decl.indexOf(":");
    if (idx < 0) continue;
    const prop = decl.slice(0, idx).trim();
    const value = decl.slice(idx + 1).trim();
    if (!prop || !value) continue;
    const key = prop.includes("-") ? prop.replace(/-([a-z])/g, (_, c) => c.toUpperCase()) : prop;
    obj[key] = value;
  }
  return obj;
}

function escapeText(text) {
  let out = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  if (out.includes("{") || out.includes("}")) {
    out = out.replace(/\{/g, "&#123;").replace(/\}/g, "&#125;");
  }
  return out;
}

function serialize(node, imgMap) {
  if (node.nodeName === "#text") {
    return escapeText(node.value);
  }
  if (node.nodeName === "#comment") return "";
  const tag = node.tagName;
  if (!tag) return "";
  let attrs = node.attrs || [];
  let out = `<${tag}`;
  let altFromData = null;
  for (const a of attrs) {
    let name = a.name;
    let value = a.value;
    if (name.startsWith("on")) continue;
    if (name === "class") name = "className";
    else if (name === "for") name = "htmlFor";
    else if (name === "data-alt") { altFromData = value; continue; }
    else if (name === "style") {
      const o = cssToObject(value);
      const keys = Object.entries(o).map(([k, v]) => `${JSON.stringify(k)}:${JSON.stringify(v)}`).join(",");
      out += ` style={{${keys}}}`;
      continue;
    } else if (NUMERIC_ATTRS.has(name)) {
      const jsName = NUMERIC_ATTRS.get(name);
      const num = Number(value);
      out += ` ${jsName}={${Number.isNaN(num) ? JSON.stringify(value) : num}}`;
      continue;
    } else if (name === "src" && value.startsWith("http")) {
      if (imgMap.has(value)) value = imgMap.get(value);
    } else {
      name = camelAttr(name);
    }
    const encoded = JSON.stringify(value);
    if (value === "" && BOOL_ATTRS.has(name)) {
      out += ` ${name}={true}`;
    } else {
      out += ` ${name}=${encoded}`;
    }
  }
  if (tag === "img" && altFromData !== null && !attrs.some((a) => a.name === "alt")) {
    out += ` alt=${JSON.stringify(altFromData)}`;
  }
  if (VOID.has(tag)) return out + " />";
  const children = (node.childNodes || []).map((c) => serialize(c, imgMap)).join("");
  return out + ">" + children + `</${tag}>`;
}

function walk(node, fn) {
  fn(node);
  for (const c of node.childNodes || []) walk(c, fn);
}

function collect(node, pred, acc = []) {
  walk(node, (n) => { if (pred(n)) acc.push(n); });
  return acc;
}

function extractTailwindConfig(html) {
  const m = html.match(/tailwind\.config\s*=\s*(\{[\s\S]*?\});?\s*<\/script>/);
  if (!m) return null;
  return m[1].trim().replace(/;\s*$/, "");
}

function extractStyles(html) {
  const out = [];
  const re = /<style>([\s\S]*?)<\/style>/g;
  let m;
  while ((m = re.exec(html))) out.push(m[1].trim());
  return out;
}

function extractBodyStyle(html) {
  const m = html.match(/<body[^>]*class="([^"]*)"/);
  return m ? m[1] : "";
}

const MIN_HEIGHT_RE = /min-height\s*:\s*max\(\s*(\d+)px\s*,\s*100dvh\s*\)/;

async function main() {
  console.log("Dossier source :", SCREENS_DIR);
  const folders = fs.readdirSync(SCREENS_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort();

  let twConfig = null;
  const allStyles = new Map();
  const imageUrls = new Set();
  const screens = [];
  const slugs = new Map();

  for (const folder of folders) {
    const htmlPath = path.join(SCREENS_DIR, folder, "code.html");
    if (!fs.existsSync(htmlPath)) continue;
    const html = fs.readFileSync(htmlPath, "utf8");

    const cfg = extractTailwindConfig(html);
    if (cfg) {
      if (!twConfig) twConfig = cfg;
      else if (twConfig !== cfg) console.warn("Config Tailwind différente dans :", folder);
    }
    for (const s of extractStyles(html)) {
      if (!MIN_HEIGHT_RE.test(s)) allStyles.set(s, s);
    }
    const doc = parse(html);
    const imgs = collect(doc, (n) => n.tagName === "img" && (n.attrs || []).some((a) => a.name === "src" && a.value.startsWith("http")));
    for (const img of imgs) {
      const src = img.attrs.find((a) => a.name === "src").value;
      imageUrls.add(src);
    }
  }

  console.log(`Screens avec code.html : ${folders.filter((f) => fs.existsSync(path.join(SCREENS_DIR, f, "code.html"))).length}`);
  console.log(`Images uniques : ${imageUrls.size}`);

  // --- Download images ---
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
  const imgMap = new Map();
  let i = 0;
  const concurrency = 8;
  const queue = [...imageUrls];
  async function worker() {
    while (queue.length) {
      const url = queue.shift();
      i++;
      const extMatch = new URL(url).pathname.match(/\.(png|jpe?g|webp|gif|svg|avif)$/i);
      const ext = extMatch ? extMatch[1].toLowerCase().replace("jpeg", "jpg") : "png";
      const local = `/images/ecran-${String(i).padStart(3, "0")}.${ext}`;
      const file = path.join(IMAGES_DIR, path.basename(local));
      try {
        const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const buf = Buffer.from(await res.arrayBuffer());
        fs.writeFileSync(file, buf);
        imgMap.set(url, local);
        process.stdout.write(`\rImages: ${imgMap.size}/${imageUrls.size}`);
      } catch (e) {
        console.warn(`\nÉchec téléchargement ${url} : ${e.message}`);
      }
    }
  }
  await Promise.all(Array.from({ length: concurrency }, worker));
  process.stdout.write("\n");

  // --- Write tailwind config ---
  if (twConfig) {
    fs.writeFileSync(
      path.join(APP_DIR, "tailwind.config.js"),
      `/** @type {import('tailwindcss').Config} */\nmodule.exports = ${twConfig};\n`
    );
    console.log("tailwind.config.js écrit");
  }

  // --- Write globals.css ---
  const globalsCss = `@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  -webkit-tap-highlight-color: transparent;
  overscroll-behavior-y: contain;
}

${[...allStyles.values()].join("\n\n")}
`;
  fs.writeFileSync(path.join(PAGES_DIR, "globals.css"), globalsCss);
  console.log(`globals.css écrit (${allStyles.size} blocs de style)`);

  // --- Generate pages ---
  fs.mkdirSync(PAGES_DIR, { recursive: true });
  let ecrans = [];
  for (const folder of folders) {
    const htmlPath = path.join(SCREENS_DIR, folder, "code.html");
    if (!fs.existsSync(htmlPath)) continue;
    const html = fs.readFileSync(htmlPath, "utf8");
    const doc = parse(html);
    const title = collect(doc, (n) => n.nodeName === "title").map((t) => t.childNodes[0]?.value || "").join("") || folder;
    const body = collect(doc, (n) => n.nodeName === "body")[0];
    const bodyClass = extractBodyStyle(html).trim();
    const minHeightMatch = html.match(MIN_HEIGHT_RE);
    const minHeight = minHeightMatch ? `style={{ minHeight: "max(${minHeightMatch[1]}px, 100dvh)" }}` : "";
    const inner = (body.childNodes || []).map((c) => serialize(c, imgMap)).join("");
    let slug = slugify(folder);
    let n = 2;
    while (slugs.has(slug)) slug = `${slugify(folder)}-${n++}`;
    slugs.set(slug, true);

    const page = `import type { Metadata } from "next";

export const metadata: Metadata = { title: ${JSON.stringify(title)} };

export default function Page() {
  return (
    <div className="${bodyClass}" ${minHeight}>${inner}
    </div>
  );
}
`;
    fs.mkdirSync(path.join(PAGES_DIR, slug), { recursive: true });
    fs.writeFileSync(path.join(PAGES_DIR, slug, "page.tsx"), page);
    ecrans.push({ slug, folder, title });
  }
  ecrans.sort((a, b) => a.slug.localeCompare(b.slug));

  fs.writeFileSync(
    path.join(APP_DIR, "src", "screens.json"),
    JSON.stringify(ecrans, null, 2)
  );

  const indexPage = `import Link from "next/link";
import screens from "@/screens.json";

export const metadata = { title: "Tous les écrans - Edukora" };

export default function EcransPage() {
  return (
    <main className="min-h-screen bg-background text-on-surface p-6 font-body-md">
      <h1 className="font-headline-md text-headline-md text-primary mb-2">Tous les écrans Edukora</h1>
      <p className="text-label-sm text-on-surface-variant mb-6">{screens.length} écrans générés depuis Stitch</p>
      <ul className="space-y-2">
        {screens.map((s) => (
          <li key={s.slug}>
            <Link href={"/" + s.slug} className="block rounded-xl border border-outline-variant bg-surface-container-lowest p-3 hover:bg-surface-container-low transition-colors">
              <span className="text-label-sm text-on-surface">/{s.slug}</span>
              <span className="block text-label-xs text-on-surface-variant">{s.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
`;
  fs.mkdirSync(path.join(PAGES_DIR, "ecrans"), { recursive: true });
  fs.writeFileSync(path.join(PAGES_DIR, "ecrans", "page.tsx"), indexPage);
  fs.writeFileSync(path.join(PAGES_DIR, "page.tsx"), `import { redirect } from "next/navigation";
export default function Page() { redirect("/accueil-edukora"); }
`);
  console.log(`Pages générées : ${ecrans.length}`);
  console.log("Terminé.");
}

main().catch((e) => { console.error(e); process.exit(1); });
