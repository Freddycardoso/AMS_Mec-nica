import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const dir = './public/images';
const files = fs.readdirSync(dir);

async function optimize() {
  for (const file of files) {
    if (file.match(/\.(jpg|jpeg|png|webp)$/i)) {
      const filePath = path.join(dir, file);
      const ext = path.extname(file);
      const tempPath = filePath + '.tmp.webp';
      
      console.log(`Optimizing ${file}...`);
      
      try {
        await sharp(filePath)
          .resize({ width: 1200, withoutEnlargement: true })
          .webp({ quality: 80 })
          .toFile(tempPath);
          
        fs.renameSync(tempPath, filePath.replace(ext, '.webp'));
        
        // Remove old file if it wasn't already a webp
        if (ext.toLowerCase() !== '.webp') {
          fs.unlinkSync(filePath);
          console.log(`Converted ${file} to WebP.`);
        }
      } catch (err) {
        console.error(`Error processing ${file}:`, err);
      }
    }
  }
}

optimize();
