import { createRequire } from "node:module";
import { writeFile } from "node:fs/promises";
import QRCode from "qrcode";
const require = createRequire(import.meta.url);
const sharp = require(
  require.resolve("sharp", {
    paths: [process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES || process.cwd()],
  }),
);
for (const [file, size] of [
  ["apple-touch-icon.png", 180],
  ["favicon.png", 48],
])
  await sharp("public/brand/icon.svg")
    .resize(size, size)
    .png()
    .toFile("public/" + file);
await sharp("public/brand/social.svg")
  .resize(1200, 630)
  .png()
  .toFile("public/brand/social.png");
await writeFile(
  "public/brand/app-store-qr.svg",
  await QRCode.toString("https://apps.apple.com/gb/app/snaglist/id6758858102", {
    type: "svg",
    margin: 4,
    errorCorrectionLevel: "M",
    color: { dark: "#1A1D23", light: "#FFFFFF" },
  }),
);
console.log("Rendered social image, icons and App Store QR.");
