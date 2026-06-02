/* ============================================
   PARTICLE SYSTEM — Hiệu ứng hạt công nghệ
   ============================================ */

class ParticleSystem {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.connections = [];
    this.mouse = { x: null, y: null, radius: 150 };
    this.animationId = null;
    
    this.resize();
    this.init();
    this.animate();
    
    window.addEventListener('resize', () => this.resize());
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });
  }
  
  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }
  
  init() {
    const particleCount = Math.min(Math.floor(window.innerWidth / 12), 100);
    this.particles = [];
    
    for (let i = 0; i < particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        color: Math.random() > 0.5 ? '#ff007f' : '#00f0ff',
        opacity: Math.random() * 0.5 + 0.2
      });
    }
  }
  
  drawParticle(particle) {
    this.ctx.beginPath();
    this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    this.ctx.fillStyle = particle.color;
    this.ctx.globalAlpha = particle.opacity;
    this.ctx.fill();
    this.ctx.globalAlpha = 1;
  }
  
  drawConnection(p1, p2, distance) {
    const maxDistance = 150;
    const opacity = (1 - distance / maxDistance) * 0.3;
    
    this.ctx.beginPath();
    this.ctx.moveTo(p1.x, p1.y);
    this.ctx.lineTo(p2.x, p2.y);
    this.ctx.strokeStyle = p1.color;
    this.ctx.globalAlpha = opacity;
    this.ctx.lineWidth = 0.5;
    this.ctx.stroke();
    this.ctx.globalAlpha = 1;
  }
  
  drawMouseConnection(particle) {
    const dx = particle.x - this.mouse.x;
    const dy = particle.y - this.mouse.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance < this.mouse.radius) {
      const opacity = (1 - distance / this.mouse.radius) * 0.5;
      this.ctx.beginPath();
      this.ctx.moveTo(particle.x, particle.y);
      this.ctx.lineTo(this.mouse.x, this.mouse.y);
      this.ctx.strokeStyle = '#00f0ff';
      this.ctx.globalAlpha = opacity;
      this.ctx.lineWidth = 1;
      this.ctx.stroke();
      this.ctx.globalAlpha = 1;
    }
  }
  
  updateParticle(particle) {
    particle.x += particle.vx;
    particle.y += particle.vy;
    
    // Boundary check
    if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
    if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
    
    // Mouse interaction
    if (this.mouse.x !== null) {
      const dx = particle.x - this.mouse.x;
      const dy = particle.y - this.mouse.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < this.mouse.radius) {
        const force = (this.mouse.radius - distance) / this.mouse.radius;
        const angle = Math.atan2(dy, dx);
        particle.x += Math.cos(angle) * force * 2;
        particle.y += Math.sin(angle) * force * 2;
      }
    }
  }
  
  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Update and draw particles
    this.particles.forEach(particle => {
      this.updateParticle(particle);
      this.drawParticle(particle);
      this.drawMouseConnection(particle);
    });
    
    // Draw connections between particles
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          this.drawConnection(this.particles[i], this.particles[j], distance);
        }
      }
    }
    
    this.animationId = requestAnimationFrame(() => this.animate());
  }
  
  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }
}

// Glitch Text Effect
function applyGlitchEffect(element, interval = 3000) {
  const originalText = element.textContent;
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
  
  setInterval(() => {
    if (Math.random() > 0.7) {
      let iterations = 0;
      const maxIterations = 10;
      
      const glitch = setInterval(() => {
        element.textContent = originalText
          .split('')
          .map((letter, index) => {
            if (index < iterations / 2) {
              return originalText[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('');
        
        iterations += 1;
        
        if (iterations > maxIterations * 2) {
          clearInterval(glitch);
          element.textContent = originalText;
        }
      }, 30);
    }
  }, interval);
}

// Data Stream Effect for backgrounds
function createDataStream(container) {
  const streamCount = 5;
  
  for (let i = 0; i < streamCount; i++) {
    const stream = document.createElement('div');
    stream.className = 'data-stream';
    stream.style.cssText = `
      position: fixed;
      top: 0;
      left: ${Math.random() * 100}%;
      width: 1px;
      height: 100%;
      background: linear-gradient(to bottom, transparent, rgba(0, 240, 255, 0.3), transparent);
      animation: dataStream ${3 + Math.random() * 3}s linear infinite;
      animation-delay: ${Math.random() * 3}s;
      pointer-events: none;
      z-index: 1;
      opacity: ${0.1 + Math.random() * 0.2};
    `;
    container.appendChild(stream);
  }
  
  // Add keyframes for data stream animation
  if (!document.getElementById('data-stream-style')) {
    const style = document.createElement('style');
    style.id = 'data-stream-style';
    style.textContent = `
      @keyframes dataStream {
        0% { transform: translateY(-100%); }
        100% { transform: translateY(100%); }
      }
    `;
    document.head.appendChild(style);
  }
}

// Circuit board pattern overlay
function createCircuitPattern() {
  const canvas = document.createElement('canvas');
  canvas.width = 200;
  canvas.height = 200;
  const ctx = canvas.getContext('2d');
  
  // Draw circuit pattern
  ctx.strokeStyle = 'rgba(0, 240, 255, 0.05)';
  ctx.lineWidth = 1;
  
  // Horizontal lines
  for (let i = 0; i < 200; i += 20) {
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(100, i);
    ctx.lineTo(100, i + 10);
    ctx.lineTo(200, i + 10);
    ctx.stroke();
  }
  
  // Vertical lines
  for (let i = 0; i < 200; i += 20) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, 100);
    ctx.lineTo(i + 10, 100);
    ctx.lineTo(i + 10, 200);
    ctx.stroke();
  }
  
  // Dots at intersections
  ctx.fillStyle = 'rgba(255, 0, 127, 0.1)';
  for (let x = 0; x < 200; x += 40) {
    for (let y = 0; y < 200; y += 40) {
      ctx.beginPath();
      ctx.arc(x, y, 2, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  
  return canvas.toDataURL();
}

// Holographic shimmer effect
function applyHolographicEffect(element) {
  element.style.position = 'relative';
  element.style.overflow = 'hidden';
  
  const shimmer = document.createElement('div');
  shimmer.style.cssText = `
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.05),
      rgba(0, 240, 255, 0.1),
      rgba(255, 255, 255, 0.05),
      transparent
    );
    transform: skewX(-20deg);
    animation: holographicShimmer 6s ease-in-out infinite;
    pointer-events: none;
    z-index: 1;
  `;
  
  element.appendChild(shimmer);
  
  if (!document.getElementById('holographic-style')) {
    const style = document.createElement('style');
    style.id = 'holographic-style';
    style.textContent = `
      @keyframes holographicShimmer {
        0% { left: -100%; }
        50%, 100% { left: 200%; }
      }
    `;
    document.head.appendChild(style);
  }
}

// Scan line effect
function createScanLine() {
  const scanLine = document.createElement('div');
  scanLine.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, rgba(0, 240, 255, 0.5), transparent);
    animation: scanLine 4s linear infinite;
    pointer-events: none;
    z-index: 9997;
    box-shadow: 0 0 20px rgba(0, 240, 255, 0.3);
  `;
  document.body.appendChild(scanLine);
  
  if (!document.getElementById('scanline-style')) {
    const style = document.createElement('style');
    style.id = 'scanline-style';
    style.textContent = `
      @keyframes scanLine {
        0% { top: 0%; opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { top: 100%; opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }
}

// Initialize all effects
function initTechEffects() {
  // Create particle canvas
  const particleCanvas = document.createElement('canvas');
  particleCanvas.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    pointer-events: none;
    opacity: 0.6;
  `;
  document.body.prepend(particleCanvas);
  
  const particleSystem = new ParticleSystem(particleCanvas);
  
  // Create data streams
  createDataStream(document.body);
  
  // Create scan line
  createScanLine();
  
  // Apply glitch effect to main title after it loads
  setTimeout(() => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
      applyGlitchEffect(heroTitle, 5000);
    }
  }, 1000);
  
  // Apply holographic effect to cards
  setTimeout(() => {
    document.querySelectorAll('.card').forEach(card => {
      applyHolographicEffect(card);
    });
  }, 500);
  
  return particleSystem;
}

// Export for use in app.js
window.initTechEffects = initTechEffects;
window.ParticleSystem = ParticleSystem;