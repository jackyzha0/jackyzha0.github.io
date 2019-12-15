// Particle credit to Y Endo

function random(low, high) {
  return Math.random() * (high - low) + low;
}

class Visual {
  constructor() {
    this.canvas = document.querySelector('#canvas');
    this.context = this.canvas.getContext('2d');
    this.canvasWidth = 0;
    this.canvasHeight = 0;
    this.particleLength = 150;
    this.particles = [];
    this.particleMaxRadius = 8;

    this.handleMouseMoveBind = this.handleMouseMove.bind(this);
    this.handleClickBind = this.handleClick.bind(this);
    this.handleResizeBind = this.handleResize.bind(this);

    this.initialize();
    this.render();
  }

  initialize() {
    this.resizeCanvas();
    for (let i = 0; i < this.particleLength; i++) {
      this.particles.push(this.createParticle(i));
    }
    this.bind();
  }

  bind() {
    document.body.addEventListener('mousemove', this.handleMouseMoveBind, false);
    document.body.addEventListener('click', this.handleClickBind, false);
    window.addEventListener('resize', this.handleResizeBind, false);
  }

  unbind() {
    document.body.removeEventListener('mousemove', this.handleMouseMoveBind, false);
    document.body.removeEventListener('click', this.handleClickBind, false);
    window.removeEventListener('resize', this.handleResizeBind, false);
  }

  handleMouseMove(e) {
    this.enlargeParticle(e.clientX, e.clientY);
  }

  handleClick(e) { }

  handleResize() {
    this.resizeCanvas();
  }

  resizeCanvas() {
    this.canvasWidth = document.body.offsetWidth;
    this.canvasHeight = document.body.offsetHeight;
    this.canvas.width = this.canvasWidth * window.devicePixelRatio;
    this.canvas.height = this.canvasHeight * window.devicePixelRatio;
    this.context = this.canvas.getContext('2d');
    this.context.scale(window.devicePixelRatio, window.devicePixelRatio);
  }

  createParticle(id, isRecreate) {
    const radius = random(1, this.particleMaxRadius);
    const x = isRecreate ? -radius - random(0, this.canvasWidth) : random(0, this.canvasWidth);
    let y = random(this.canvasHeight / 2 - 150, this.canvasHeight / 2 + 150);
    y += random(-100, 100);
    const alpha = random(0.05, 0.6);

    var col
    switch (Math.floor(Math.random() * 3)) {
      case 0:
        col = [40, 75, 99];
        break;
      case 1:
        col = [132, 165, 157];
        break;
      case 2:
        col = [242, 132, 130];
        break;
    }

    return {
      id: id,
      x: x,
      y: y,
      startY: y,
      radius: radius,
      defaultRadius: radius,
      startAngle: 0,
      endAngle: Math.PI * 2,
      alpha: alpha,
      ref_alpha: alpha,
      color: { r: col[0], g: col[1], b: col[2] },
      speed: alpha,
      amplitude: random(50, 200)
    };
  }

  drawParticles() {
    this.particles.forEach(particle => {
      this.moveParticle(particle);
      this.context.beginPath();
      this.context.fillStyle = `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, ${particle.alpha})`;
      this.context.arc(particle.x, particle.y, particle.radius, particle.startAngle, particle.endAngle);
      this.context.fill();
    });
  }

  moveParticle(particle) {
    particle.x += particle.speed;
    particle.y = particle.startY + particle.amplitude * Math.sin(((particle.x / 6) * Math.PI) / 180);
  }

  enlargeParticle(clientX, clientY) {
    this.particles.forEach(particle => {

      const distance = Math.hypot(particle.x - clientX, particle.y - clientY);

      if (distance <= 100) {
        const scaling = (100 - distance) / 9;
        TweenMax.to(particle, 0.5, {
          radius: particle.defaultRadius + scaling,
          alpha: 1,
          ease: Power2.easeOut,
          speed: 1
        });
      } else {
        TweenMax.to(particle, 0.5, {
          radius: particle.defaultRadius,
          ease: Power2.easeOut,
          alpha: particle.ref_alpha,
          speed: particle.ref_alpha
        });
      }
    });
  }

  render() {
    this.context.clearRect(0, 0, this.canvasWidth + this.particleMaxRadius * 2, this.canvasHeight);
    this.context.fillStyle = "#fbfffe";
    this.context.fillRect(0, 0, canvas.width, canvas.height);
    this.drawParticles();

    this.particles.forEach(particle => {
      if (particle.x - particle.radius >= this.canvasWidth) {
        this.particles[particle.id] = this.createParticle(particle.id, true);
      }
    });

    requestAnimationFrame(this.render.bind(this));
  }
}

new Visual();
