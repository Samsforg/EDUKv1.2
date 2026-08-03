const fs = require("fs");
const zlib = require("zlib");

function crc32(buf) {
  let c, table = [];
  for (let n = 0; n < 256; n++) {
    c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[n] = c >>> 0;
  }
  let crc = 0xffffffff;
  for (const b of buf) crc = table[(crc ^ b) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const typeBuf = Buffer.from(type, "ascii");
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])));
  return Buffer.concat([len, typeBuf, data, crc]);
}

function encodePNG(size, pixels) {
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; ihdr[9] = 6; ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;
  const raw = Buffer.alloc(size * (size * 4 + 1));
  for (let y = 0; y < size; y++) {
    raw[y * (size * 4 + 1)] = 0;
    for (let x = 0; x < size; x++) {
      const p = pixels[y * size + x];
      raw.copy(p, y * (size * 4 + 1) + 1 + x * 4);
    }
  }
  const idat = zlib.deflateSync(raw, { level: 9 });
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", ihdr),
    chunk("IDAT", idat),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

const PRIMARY = [0, 71, 171];      // #0047ab
const PRIMARY_D = [0, 52, 128];    // dégradé
const WHITE = [255, 255, 255];
const GOLD = [255, 193, 7];        // gland

function inRoundedRect(x, y, s, r) {
  const margin = s * 0.06;
  const x0 = margin, y0 = margin, x1 = s - margin, y1 = s - margin;
  if (x < x0 || x > x1 || y < y0 || y > y1) return false;
  const cx = Math.max(x0 + r, Math.min(x, x1 - r));
  const cy = Math.max(y0 + r, Math.min(y, y1 - r));
  const dx = x - cx, dy = y - cy;
  return dx * dx + dy * dy <= r * r;
}

function inDiamond(x, y, cx, cy, hw, hh) {
  const dx = (x - cx) / hw, dy = (y - cy) / hh;
  return Math.abs(dx) + Math.abs(dy) <= 1;
}

function render(size) {
  const px = new Array(size * size);
  const r = size * 0.24;
  const cxc = size * 0.5;
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      let c;
      if (!inRoundedRect(x, y, size, r)) {
        c = [0, 0, 0, 0];
      } else {
        const t = y / size;
        c = [Math.round(PRIMARY[0] + (PRIMARY_D[0] - PRIMARY[0]) * t),
             Math.round(PRIMARY[1] + (PRIMARY_D[1] - PRIMARY[1]) * t),
             Math.round(PRIMARY[2] + (PRIMARY_D[2] - PRIMARY[2]) * t), 255];
        const nx = (x - cxc) / size, ny = (y - cxc) / size;
        // tête (cercle)
        const headCx = 0, headCy = 0.14, headR = 0.115;
        if ((nx - headCx) ** 2 + (ny - headCy) ** 2 <= headR ** 2) c = [255, 255, 255, 255];
        // bande du mortier (rect horizontal)
        const bandY = 0.065, bandH = 0.045, bandW = 0.28;
        if (Math.abs(ny - bandY) <= bandH / 2 && Math.abs(nx) <= bandW / 2) c = [255, 255, 255, 255];
        // plateau (losange)
        if (inDiamond(nx, ny, 0, -0.055, 0.34, 0.115)) c = [255, 255, 255, 255];
        // gland
        const tasselX = 0.30, tasselY = -0.16;
        const gx = nx - tasselX, gy = ny - tasselY;
        if (gx * gx + gy * gy <= 0.045 ** 2) c = [...GOLD, 255];
        // fil du gland (petit trait diagonal)
        const dx = nx - 0.22, dy = ny - (-0.075);
        if (Math.abs(dx + dy * 0.7) < 0.012 && dy > -0.05 && dy < 0.02) c = [...GOLD, 255];
      }
      px[y * size + x] = Buffer.from(c);
    }
  }
  return encodePNG(size, px);
}

for (const s of [512, 192]) {
  fs.writeFileSync(`public/icons/launcher-${s}.png`, render(s));
  console.log(`launcher-${s}.png écrit (${s}x${s})`);
}
