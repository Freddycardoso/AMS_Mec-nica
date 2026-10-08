import fs from 'fs';

const filePath = './src/pages/index.astro';
let content = fs.readFileSync(filePath, 'utf8');

// Update logos
content = content.replace(/logo\.png/g, 'logo.webp');

// Update preload links
content = content.replace(
  /<link rel="preload" href="\/images\/garage_door_hq\.webp\?v=2" as="image" \/>/,
  `<link rel="preload" href="/images/garage_door_hq-mobile.webp?v=2" as="image" media="(max-width: 768px)" />
    <link rel="preload" href="/images/garage_door_hq.webp?v=2" as="image" media="(min-width: 769px)" />`
);
content = content.replace(
  /<link rel="preload" href="\/images\/hero_hq\.webp\?v=2" as="image" \/>/,
  `<link rel="preload" href="/images/hero_hq-mobile.webp?v=2" as="image" media="(max-width: 768px)" />
    <link rel="preload" href="/images/hero_hq.webp?v=2" as="image" media="(min-width: 769px)" />`
);

// Update mobile media query for garage door background
content = content.replace(
  /(\@media \(max-width: 768px\) \{\s*#garage-door-preloader \{)/,
  `$1\n          background-image: url('/images/garage_door_hq-mobile.webp?v=2');`
);

// Helper function to replace <img> tags with srcset
const replaceImg = (imgName) => {
  const regex = new RegExp(`src="\\/images\\/${imgName}\\.webp(\\?v=2)?"`, 'g');
  const srcset = `src="/images/${imgName}.webp$1" srcset="/images/${imgName}-mobile.webp$1 600w, /images/${imgName}.webp$1 1200w" sizes="(max-width: 768px) 100vw, 50vw"`;
  content = content.replace(regex, srcset);
};

const imagesToUpdate = [
  'hero_hq',
  'troca_oleo',
  'freios_suspensao',
  'injecao_motor',
  'revisao_preventiva',
  'embreagem_cambio',
  'manutencao_motor',
  'loja_1',
  'interior_1',
  'loja_2',
  'interior_2'
];

imagesToUpdate.forEach(replaceImg);

// Fix sizes for hero and stores, which are 100vw or 50vw. The default above is fine for general, but let's just make it simpler.
// "sizes='(max-width: 768px) 100vw, 50vw'" is perfectly fine and safe for performance.

fs.writeFileSync(filePath, content, 'utf8');
console.log('Updated index.astro');
