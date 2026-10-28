/**
 * Regenerates raster brand assets from `src/app/icon.svg`.
 *
 * Run after editing the logo:
 *     pnpm icons
 *
 * Outputs:
 *   src/app/favicon.ico        — ICO containing a PNG (32×32)
 *   src/app/apple-icon.png     — Apple touch icon (180×180)
 *   public/icons/icon-192.png  — manifest icon
 *   public/icons/icon-512.png  — manifest icon
 *
 * The SVG source stays the single source of truth — keep it in sync with
 * the path geometry in src/components/brand/Logo.tsx.
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const SVG_PATH = path.join(ROOT, "src", "app", "icon.svg");

/** Wrap a PNG buffer in a minimal single-image ICO container. */
function pngToIco(png, size) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(1, 4); // count

  const entry = Buffer.alloc(16);
  entry.writeUInt8(size >= 256 ? 0 : size, 0); // width
  entry.writeUInt8(size >= 256 ? 0 : size, 1); // height
  entry.writeUInt8(0, 2); // palette colors
  entry.writeUInt8(0, 3); // reserved
  entry.writeUInt16LE(1, 4); // color planes
  entry.writeUInt16LE(32, 6); // bits per pixel
  entry.writeUInt32LE(png.length, 8); // data size
  entry.writeUInt32LE(6 + 16, 12); // data offset

  return Buffer.concat([header, entry, png]);
}

const svg = readFileSync(SVG_PATH);

mkdirSync(path.join(ROOT, "public", "icons"), { recursive: true });

const apple = await sharp(svg).resize(180, 180).png().toBuffer();
const icon192 = await sharp(svg).resize(192, 192).png().toBuffer();
const icon512 = await sharp(svg).resize(512, 512).png().toBuffer();
const favicon = await sharp(svg).resize(32, 32).png().toBuffer();

writeFileSync(path.join(ROOT, "src", "app", "apple-icon.png"), apple);
writeFileSync(path.join(ROOT, "src", "app", "favicon.ico"), pngToIco(favicon, 32));
writeFileSync(path.join(ROOT, "public", "icons", "icon-192.png"), icon192);
writeFileSync(path.join(ROOT, "public", "icons", "icon-512.png"), icon512);

console.log("✓ Generated favicon.ico, apple-icon.png and manifest icons.");
