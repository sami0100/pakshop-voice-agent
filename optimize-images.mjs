import sharp from "sharp";
import fs from "fs/promises";
import path from "path";

const productsDir = path.join(process.cwd(), "public", "products");
const files = await fs.readdir(productsDir);

for (const file of files) {
  if (!file.toLowerCase().endsWith(".webp")) {
    continue;
  }

  const inputPath = path.join(productsDir, file);
  const stats = await fs.stat(inputPath);

  const sizeKB = stats.size / 1024;

  // Leave already-small images alone
  if (sizeKB < 300) {
    console.log(`Skipped:   ${file} (${Math.round(sizeKB)} KB)`);
    continue;
  }

  const tempPath = path.join(
    productsDir,
    `temp-${file}`
  );

  await sharp(inputPath)
    .resize({
      width: 1200,
      withoutEnlargement: true,
    })
    .webp({
      quality: 82,
      effort: 4,
    })
    .toFile(tempPath);

  const optimizedStats = await fs.stat(tempPath);

  await fs.unlink(inputPath);
  await fs.rename(tempPath, inputPath);

  console.log(
    `Optimized: ${file} | ${(
      stats.size /
      1024 /
      1024
    ).toFixed(2)} MB → ${(
      optimizedStats.size /
      1024 /
      1024
    ).toFixed(2)} MB`
  );
}

console.log("\n✅ Product image optimization complete.");