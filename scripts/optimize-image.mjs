import sharp from "sharp";
import { readFileSync } from "fs";

const files = process.argv.slice(2);

for (const file of files) {
  const buffer = readFileSync(file);
  const { width } = await sharp(buffer).metadata();
  if (width > 1600) {
    await sharp(buffer)
      .resize({ width: 1600, withoutEnlargement: true })
      .toFile(file + ".tmp");
    // overwrite original in place
    await import("fs/promises").then((fs) => fs.rename(file + ".tmp", file));
  }
}
