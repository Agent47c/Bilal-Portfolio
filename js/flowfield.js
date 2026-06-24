/* ================================================
   FLOWFIELD.JS — Multi-Section Particle Fluid Simulation
   Renders custom crisp canvas flow fields per section with 
   Intersection Observer for peak 60fps performance.
   ================================================ */

class FlowFieldInstance {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.active = false;
    this.animationId = null;
    
    // Configurable parameters
    this.scale = 0.004; // Trig noise scale
    this.speed = 1.0;   // Velocity multiplier
    this.trailOpacity = 0.08; // Trail length
    this.colors = ['#7C3AED', '#06B6D4', '#34D399']; // Violet, Cyan, Emerald
    this.mouse = { x: null, y: null, radius: 150 };

    this.init();
  }

  init() {
    this.resize();
    
    // Mouse interaction scoped to parent section
    const parent = this.canvas.parentElement;
    parent.addEventListener('mousemove', (e) => this.onMouseMove(e));
    parent.addEventListener('mouseleave', () => this.onMouseLeave());
  }

  resize() {
    const parent = this.canvas.parentElement;
    this.width = this.canvas.width = parent.offsetWidth;
    this.height = this.canvas.height = parent.offsetHeight;
    
    // Adjust particle count based on section area to remain highly performant
    const area = this.width * this.height;
    this.numParticles = Math.min(250, Math.max(50, Math.floor(area / 8000)));
    
    this.createParticles();
  }

  createParticles() {
    this.particles = [];
    for (let i = 0; i < this.numParticles; i++) {
      this.particles.push(this.createNewParticle());
    }
  }

  createNewParticle() {
    return {
      x: Math.random() * this.width,
      y: Math.random() * this.height,
      vx: 0,
      vy: 0,
      history: [],
      maxHistory: Math.floor(Math.random() * 12) + 8,
      speed: Math.random() * 1.2 + 0.4,
      color: this.colors[Math.floor(Math.random() * this.colors.length)]
    };
  }

  onMouseMove(e) {
    const rect = this.canvas.getBoundingClientRect();
    this.mouse.x = e.clientX - rect.left;
    this.mouse.y = e.clientY - rect.top;
  }

  onMouseLeave() {
    this.mouse.x = null;
    this.mouse.y = null;
  }

  start() {
    if (!this.active) {
      this.active = true;
      this.animate();
    }
  }

  stop() {
    this.active = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  animate() {
    if (!this.active) return;

    // Soft clear for trailing fade
    this.ctx.fillStyle = `rgba(8, 11, 20, ${this.trailOpacity})`;
    this.ctx.fillRect(0, 0, this.width, this.height);

    this.particles.forEach(p => {
      // Flow angle based on trigonometric waves
      const angle = (Math.sin(p.x * this.scale) + Math.cos(p.y * this.scale)) * Math.PI * 2;
      
      let targetVx = Math.cos(angle) * p.speed * this.speed;
      let targetVy = Math.sin(angle) * p.speed * this.speed;

      // Mouse repulsion physics
      if (this.mouse.x !== null && this.mouse.y !== null) {
        const dx = p.x - this.mouse.x;
        const dy = p.y - this.mouse.y;
        const dist = Math.hypot(dx, dy);
        
        if (dist < this.mouse.radius) {
          const force = (this.mouse.radius - dist) / this.mouse.radius;
          const angleToMouse = Math.atan2(dy, dx);
          targetVx += Math.cos(angleToMouse) * force * 2.5;
          targetVy += Math.sin(angleToMouse) * force * 2.5;
        }
      }

      // Smooth interpolation
      p.vx += (targetVx - p.vx) * 0.1;
      p.vy += (targetVy - p.vy) * 0.1;
      
      p.x += p.vx;
      p.y += p.vy;

      p.history.push({ x: p.x, y: p.y });
      if (p.history.length > p.maxHistory) {
        p.history.shift();
      }

      // Draw trails
      if (p.history.length > 1) {
        this.ctx.beginPath();
        this.ctx.moveTo(p.history[0].x, p.history[0].y);
        for (let i = 1; i < p.history.length; i++) {
          this.ctx.lineTo(p.history[i].x, p.history[i].y);
        }
        this.ctx.strokeStyle = p.color;
        this.ctx.lineWidth = 1.0;
        this.ctx.lineCap = 'round';
        this.ctx.stroke();
      }

      // Boundary wraps
      if (p.x < 0 || p.x > this.width || p.y < 0 || p.y > this.height) {
        Object.assign(p, this.createNewParticle());
        p.history = [];
      }
    });

    this.animationId = requestAnimationFrame(() => this.animate());
  }
}

// Manager class to manage all flowfields and optimize performance using IntersectionObserver
class FlowFieldManager {
  constructor() {
    this.instances = [];
    this.init();
  }

  init() {
    const canvases = document.querySelectorAll('.section-flowfield');
    if (canvases.length === 0) return;

    // Create instances
    canvases.forEach(canvas => {
      const instance = new FlowFieldInstance(canvas);
      this.instances.push(instance);
    });

    // Setup intersection observer to pause animations off-screen
    const observerOptions = {
      root: null,
      threshold: 0.05 // Trigger when even a small portion is visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const canvas = entry.target.querySelector('.section-flowfield');
        if (!canvas) return;
        
        const instance = this.instances.find(inst => inst.canvas === canvas);
        if (!instance) return;

        if (entry.isIntersecting) {
          instance.start();
        } else {
          instance.stop();
        }
      });
    }, observerOptions);

    // Observe each parent section container
    this.instances.forEach(instance => {
      observer.observe(instance.canvas.parentElement);
    });

    // Resize listener
    window.addEventListener('resize', () => {
      this.instances.forEach(instance => instance.resize());
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new FlowFieldManager();
});
