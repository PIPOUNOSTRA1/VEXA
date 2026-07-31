const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const imagesDir = path.join(__dirname, 'images');

if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

const imagesToRender = [
  { name: 'aura_botanica_product.png', url: 'http://localhost:8085/images/aura_botanica_product.svg', width: 800, height: 1000 },
  { name: 'aura_hero.png', url: 'http://localhost:8085/images/aura_hero.svg', width: 1200, height: 675 },
  { name: 'kronos_hero.png', url: 'http://localhost:8085/images/kronos_hero.svg', width: 1200, height: 675 },
  { name: 'nexus_hero.png', url: 'http://localhost:8085/images/nexus_hero.svg', width: 1200, height: 675 }
];

imagesToRender.forEach(img => {
  const targetPng = path.join(imagesDir, img.name);
  const cmd = `"${edgePath}" --headless --disable-gpu --screenshot="${targetPng}" --window-size=${img.width},${img.height} "${img.url}"`;
  console.log('Rendering PNG:', img.name);
  try {
    execSync(cmd, { stdio: 'inherit' });
    console.log('Successfully created:', targetPng);
  } catch (err) {
    console.error('Error creating PNG:', err.message);
  }
});
