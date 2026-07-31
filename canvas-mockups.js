/* ==========================================================================
   VEXA STUDIO — High-Definition 2D/3D Canvas Visual Mockup Renderer Engine
   Renders photorealistic device frames, 3D products, packaging, and studio viewports.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  renderAuraHeroCanvas();
  renderKronosWatchCanvas();
  renderNexusAudioCanvas();
  renderPackagingUniverseCanvas();
  renderStudioBlenderCanvas();
});

/* 1. AURA Botanica Hero Canvas Visual */
function renderAuraHeroCanvas() {
  const canvas = document.getElementById('aura-canvas-hero');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = (canvas.width = canvas.parentElement.offsetWidth || 1200);
  const h = (canvas.height = 550);

  // Background Gradient
  const grad = ctx.createRadialGradient(w/2, h/2, 50, w/2, h/2, w/2);
  grad.addColorStop(0, 'rgba(16, 185, 129, 0.18)');
  grad.addColorStop(1, '#050608');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // Magazine Typography Background
  ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
  ctx.font = '900 64px "Syne", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('AURA BOTANICA', w/2, 120);

  // MacBook Frame
  const mbW = 860, mbH = 420;
  const mbX = (w - mbW)/2, mbY = 70;
  ctx.fillStyle = '#12131C';
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
  ctx.lineWidth = 2;
  roundRect(ctx, mbX, mbY, mbW, mbH, 20, true, true);

  // MacBook Display Content
  ctx.fillStyle = '#0A0B0E';
  roundRect(ctx, mbX + 20, mbY + 20, mbW - 40, mbH - 40, 10, true, false);

  // Store Banner Text
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '800 28px "Syne", sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('PURE BOTANICAL ELIXIR', mbX + 50, mbY + 110);

  ctx.fillStyle = '#A1A1AA';
  ctx.font = '400 14px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('100% Organic Cold-Pressed Serum & Diagnostic Routine', mbX + 50, mbY + 140);

  // CTA Button inside Store
  ctx.fillStyle = '#10B981';
  roundRect(ctx, mbX + 50, mbY + 165, 150, 40, 20, true, false);
  ctx.fillStyle = '#000000';
  ctx.font = '700 12px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('SHOP ROUTINE →', mbX + 125, mbY + 190);

  // 3D Glass Serum Bottle Floating Center Render
  const bX = w/2 + 80, bY = 160, bW = 150, bH = 250;
  ctx.save();
  ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
  ctx.shadowBlur = 40;
  ctx.fillStyle = '#16261D';
  ctx.strokeStyle = '#10B981';
  ctx.lineWidth = 3;
  roundRect(ctx, bX, bY, bW, bH, 22, true, true);
  
  // Dropper Cap
  ctx.fillStyle = '#E4E4E7';
  roundRect(ctx, bX + 45, bY - 35, 60, 35, 6, true, false);

  // Bottle Label
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '800 20px "Syne", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('AURA', bX + bW/2, bY + 110);
  ctx.fillStyle = '#10B981';
  ctx.font = '700 11px sans-serif';
  ctx.fillText('SERUM 50ML', bX + bW/2, bY + 135);
  ctx.restore();

  // iPhone 15 Pro Overlay Left
  const ipX = mbX - 40, ipY = 210, ipW = 160, ipH = 300;
  ctx.save();
  ctx.shadowColor = 'rgba(0, 0, 0, 0.95)';
  ctx.shadowBlur = 50;
  ctx.fillStyle = '#1C1D26';
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 3;
  roundRect(ctx, ipX, ipY, ipW, ipH, 26, true, true);
  
  ctx.fillStyle = '#08090C';
  roundRect(ctx, ipX + 10, ipY + 10, ipW - 20, ipH - 20, 18, true, false);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 13px "Syne", sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('AURA MOBILE', ipX + 25, ipY + 60);

  ctx.fillStyle = '#10B981';
  ctx.font = '700 12px sans-serif';
  ctx.fillText('$85.00 USD', ipX + 25, ipY + 80);

  ctx.fillStyle = '#14221B';
  roundRect(ctx, ipX + 25, ipY + 95, 110, 110, 10, true, false);

  ctx.fillStyle = '#FFFFFF';
  roundRect(ctx, ipX + 25, ipY + 225, 110, 36, 18, true, false);
  ctx.fillStyle = '#000000';
  ctx.font = '700 11px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('ADD TO CART', ipX + 80, ipY + 247);
  ctx.restore();
}

/* 2. KRONOS 3D Watch Visual Canvas */
function renderKronosWatchCanvas() {
  const canvas = document.getElementById('kronos-canvas-watch');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = (canvas.width = canvas.parentElement.offsetWidth || 1200);
  const h = (canvas.height = 500);

  ctx.fillStyle = '#070605';
  ctx.fillRect(0, 0, w, h);

  // Watch Dial
  const cx = w/2, cy = h/2, r = 130;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fillStyle = '#141418';
  ctx.strokeStyle = '#D4D4D8';
  ctx.lineWidth = 5;
  ctx.fill();
  ctx.stroke();

  // Watch Hands
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(cx, cy - 80);
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 5;
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(cx + 60, cy);
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 4;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(cx, cy, 7, 0, Math.PI * 2);
  ctx.fillStyle = '#10B981';
  ctx.fill();
}

/* 3. NEXUS Audio Headphone Visual Canvas */
function renderNexusAudioCanvas() {
  const canvas = document.getElementById('nexus-canvas-audio');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = (canvas.width = canvas.parentElement.offsetWidth || 1200);
  const h = (canvas.height = 500);

  ctx.fillStyle = '#06080F';
  ctx.fillRect(0, 0, w, h);

  // Headphone Arc
  ctx.beginPath();
  ctx.arc(w/2, 280, 160, Math.PI, 0);
  ctx.strokeStyle = '#E4E4E7';
  ctx.lineWidth = 14;
  ctx.stroke();

  // Ear Cups
  ctx.fillStyle = '#1C1D26';
  ctx.strokeStyle = '#6366F1';
  ctx.lineWidth = 4;
  roundRect(ctx, w/2 - 180, 240, 50, 110, 20, true, true);
  roundRect(ctx, w/2 + 130, 240, 50, 110, 20, true, true);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '800 24px "Space Grotesk", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('NEXUS SOUNDSTAGE PRO', w/2, 100);
}

/* 4. Packaging Universe Canvas Visual */
function renderPackagingUniverseCanvas() {
  const canvas = document.getElementById('packaging-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = (canvas.width = canvas.parentElement.offsetWidth || 1200);
  const h = (canvas.height = 450);

  ctx.fillStyle = '#090706';
  ctx.fillRect(0, 0, w, h);

  // Shipping Box
  ctx.fillStyle = '#1C1814';
  ctx.strokeStyle = '#D97706';
  ctx.lineWidth = 2;
  roundRect(ctx, 100, 100, 280, 240, 16, true, true);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 18px "Syne", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('AURA BOTANICA BOX', 240, 220);

  // Shopping Bag
  ctx.fillStyle = '#14201A';
  ctx.strokeStyle = '#10B981';
  roundRect(ctx, 460, 70, 280, 280, 16, true, true);
  ctx.fillStyle = '#FFFFFF';
  ctx.fillText('SHOPPING BAG', 600, 220);

  // Gift Card
  ctx.fillStyle = '#242634';
  ctx.strokeStyle = 'rgba(255,255,255,0.2)';
  roundRect(ctx, 800, 140, 280, 170, 12, true, true);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 14px sans-serif';
  ctx.fillText('GIFT CARD & INVOICE', 940, 230);
}

/* 5. 3D Studio & Blender Workspace Canvas Visual */
function renderStudioBlenderCanvas() {
  const canvas = document.getElementById('workspace-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = (canvas.width = canvas.parentElement.offsetWidth || 1200);
  const h = (canvas.height = 450);

  ctx.fillStyle = '#060608';
  ctx.fillRect(0, 0, w, h);

  // 3D Studio Window
  ctx.fillStyle = '#1E1E1E';
  ctx.strokeStyle = '#A855F7';
  ctx.lineWidth = 2;
  roundRect(ctx, 60, 50, 500, 350, 16, true, true);
  ctx.fillStyle = '#A855F7';
  ctx.font = '700 14px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('❖ 3D UI DESIGN SYSTEM', 310, 230);

  // Blender Window
  ctx.fillStyle = '#292015';
  ctx.strokeStyle = '#F97316';
  roundRect(ctx, 640, 50, 500, 350, 16, true, true);
  ctx.fillStyle = '#F97316';
  ctx.fillText('🧊 BLENDER 3D CYCLES RENDER', 890, 230);
}

/* Helper function for rounded rectangles */
function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
  if (fill) ctx.fill();
  if (stroke) ctx.stroke();
}
