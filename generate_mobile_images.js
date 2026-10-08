import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const dir = './public/images';
const files = fs.readdirSync(dir);

async function optimizeMobile() {
  // Optimize logo
  try {
    console.log('Optimizing logo.png...');
    await sharp('./public/logo.png')
      .resize({ width: 300, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile('./public/logo.webp');
  } catch (err) {
    console.error('Error optimizing logo:', err);
  }

  // Create mobile versions
  for (const file of files) {
    if (file.endsWith('.webp') && !file.includes('-mobile')) {
      const filePath = path.join(dir, file);
      const ext = path.extname(file);
      const mobilePath = filePath.replace('.webp', '-mobile.webp');
      
      console.log(`Creating mobile version for ${file}...`);
      
      try {
        await sharp(filePath)
          .resize({ width: 600, withoutEnlargement: true })
          .webp({ quality: 75 })
          .toFile(mobilePath);
      } catch (err) {
        console.error(`Error processing ${file}:`, err);
      }
    }
  }
}

optimizeMobile();
