// Partices
function random(low, high) {
  return Math.random() * (high - low) + low
}

class Visual {
  constructor(particles, yVariance, maxParticleRadius) {
    this.canvas = document.querySelector('#canvas')
    this.context = this.canvas.getContext('2d')
    this.canvasWidth = 0
    this.canvasHeight = 0
    this.particleLength = particles
    this.yVariance = yVariance
    this.particles = []
    this.particleMaxRadius = maxParticleRadius
    this.handleResizeBind = this.resize.bind(this)
    this.initialize()
    this.render()
  }

  // Initialize particles
  initialize() {
    this.resizeCanvas()
    for (let i = 0; i < this.particleLength; i++) {
      this.particles.push(this.createParticle(i))
    }
    this.bind()
  }

  // bind event listeners
  bind() {
    window.addEventListener('resize', this.handleResizeBind, false)
  }

  unbind() {
    window.removeEventListener('resize', this.handleResizeBind, false)
  }

  resize() {
    this.particles = []
    this.unbind()
    this.initialize()
  }

  resizeCanvas() {
    this.canvasWidth = document.body.offsetWidth
    this.canvasHeight = document.body.offsetHeight
    this.canvas.width = this.canvasWidth * window.devicePixelRatio
    this.canvas.height = this.canvasHeight * window.devicePixelRatio
    this.context = this.canvas.getContext('2d')
    this.context.scale(window.devicePixelRatio, window.devicePixelRatio)
  }

  randomColour() {
    switch (Math.floor(Math.random() * 3)) {
      case 0:
        return [40, 75, 99]
      case 1:
        return [132, 165, 157]
      case 2:
        return [242, 132, 130]
    }
  }
  

  // particle creation
  createParticle(id, isRecreate) {
    // randomize position and radius
    const radius = random(2, this.particleMaxRadius)
    const x = isRecreate ? -radius : random(0, this.canvasWidth)

    // pseudo-normal distribution
    let y = random(this.canvasHeight / 2 - this.yVariance, this.canvasHeight / 2 + this.yVariance)
    y += random(-this.yVariance / 2, this.yVariance/2)

    const alpha = random(0.05, 0.5)

    // pick random colour
    const col = this.randomColour()

    return {
      id: id,
      x: x,
      y: y,
      startY: y,
      radius: radius,
      startAngle: 0,
      endAngle: Math.PI * 2,
      alpha: alpha,
      color: { r: col[0], g: col[1], b: col[2] },
      speed: alpha,
      amplitude: random(50, 250)
    }
  }

  drawParticles() {
    this.particles.forEach(particle => {
      this.moveParticle(particle)
      this.context.beginPath()
      this.context.fillStyle = `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, ${particle.alpha})`
      this.context.arc(particle.x, particle.y, particle.radius, particle.startAngle, particle.endAngle)
      this.context.fill()
    })
  }

  moveParticle(particle) {
    particle.x += particle.speed
    particle.y = particle.startY + particle.amplitude * Math.sin((particle.x * Math.PI) / (360 * 2))
  }

  render() {
    this.context.clearRect(0, 0, this.canvasWidth + this.particleMaxRadius * 2, this.canvasHeight)
    var style = getComputedStyle(document.body)
    this.context.fillStyle = style.getPropertyValue('--light')
    this.context.fillRect(0, 0, canvas.width, canvas.height)
    this.drawParticles()

    // kill offscreen particles and re-render
    this.particles.forEach(particle => {
      if (particle.x - particle.radius >= this.canvasWidth) {
        this.particles[particle.id] = this.createParticle(particle.id, true)
      }
    })

    requestAnimationFrame(this.render.bind(this))
  }
}

new Visual(150, 150, 8)

// Rotating Text
const words = document.querySelectorAll(".word")
words.forEach(word => {
  const letters = word.textContent.split("")
  word.textContent = ""
  letters.forEach(letter => {
    const span = document.createElement("span")
    if (letter == " ") {
      span.textContent = " "
    } else {
      span.textContent = letter
    }
    span.className = "letter"
    word.append(span)
  })
})


var currentWordIndex = 0
var maxWordIndex = words.length
words[currentWordIndex].style.opacity = "1"
var rotateText = () => {
  const currentWord = words[currentWordIndex]
  const nextWord = words[(currentWordIndex + 1) % maxWordIndex]

  // rotate out letters of current word
  Array.from(currentWord.children).forEach((letter, i) => {
    setTimeout(() => {
      letter.className = "letter out"
    }, i * 40)
  })

  // reveal and rotate in letters of next word
  nextWord.style.opacity = "1";
  Array.from(nextWord.children).forEach((letter, i) => {
    letter.className = "letter behind";
    setTimeout(() => {
      letter.className = "letter in";
    }, 500 + i * 20);
  })
  currentWordIndex = (currentWordIndex + 1) % maxWordIndex
}

const init = () => {
  rotateText()
  setInterval(rotateText, 3000)
}
setTimeout(init, 2000)


// Project Accordion
$(".accordion > .accordion-item .accordion_body.is-active").children(".accordion-panel").slideDown()

$(".accordion > .accordion-item > .accordion_body").click(function() {
  $(this).toggleClass("is-active").children(".accordion-panel").slideToggle("swing")
})