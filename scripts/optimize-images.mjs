import sharp from "sharp";
import path from "path";
import fs from "fs";

const INPUT_DIR = path.join(process.cwd(), "public", "icons");
const OUTPUT_DIR = path.join(process.cwd(), "public", "icons");

const SIZES = [72, 96, 128, 144, 152, 167, 180, 192, 384, 512];

async function generateIcons() {
  const inputPng = path.join(INPUT_DIR, "source.png");
  if (!fs.existsSync(inputPng)) {
    console.log("⚠️  Place source.png in public/icons/ first");
    console.log("   Creating placeholder icons...");
    for (const size of SIZES) {
      const outPath = path.join(OUTPUT_DIR, `icon-${size}.png`);
      if (!fs.existsSync(outPath)) {
        await sharp({
          create: {
            width: size,
            height: size,
            channels: 4,
            background: { r: 0, g: 71, b: 171, alpha: 1 },
          },
        })
          .png()
          .toFile(outPath);
        console.log(`  ✅ icon-${size}.png`);
      }
    }
    return;
  }

  for (const size of SIZES) {
    const outPath = path.join(OUTPUT_DIR, `icon-${size}.png`);
    await sharp(inputPng)
      .resize(size, size, { fit: "cover" })
      .png({ quality: 90 })
      .toFile(outPath);
    console.log(`✅ icon-${size}.png`);
  }

  // Apple splash screens
  const splashSizes = [
    { w: 640, h: 1136 },
    { w: 750, h: 1334 },
    { w: 828, h: 1792 },
    { w: 1125, h: 2436 },
    { w: 1242, h: 2208 },
    { w: 1242, h: 2688 },
    { w: 1536, h: 2048 },
    { w: 1668, h: 2388 },
    { w: 2048, h: 2732 },
  ];

  const splashDir = path.join(process.cwd(), "public", "splash");
  if (!fs.existsSync(splashDir)) fs.mkdirSync(splashDir, { recursive: true });

  for (const { w, h } of splashSizes) {
    const outPath = path.join(splashDir, `splash-${w}x${h}.png`);
    await sharp({
      create: {
        width: w,
        height: h,
        channels: 4,
        background: { r: 249, g: 249, b: 252, alpha: 1 },
      },
    })
      .composite([
        {
          input: path.join(OUTPUT_DIR, "icon-512.png"),
          gravity: "center",
        },
      ])
      .png()
      .toFile(outPath);
    console.log(`✅ splash-${w}x${h}.png`);
  }

  console.log("\n🎉 All icons generated!");
}

generateIcons().catch(console.error);