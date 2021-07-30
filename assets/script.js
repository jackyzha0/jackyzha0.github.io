const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

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


if (!isReducedMotion) {
  setTimeout(init, 2000)
}


// Project Accordion
$(".accordion > .accordion-item .accordion_body.is-active").children(".accordion-panel").slideDown()
$(".accordion > .accordion-item > .accordion_body").click(function() {
  $(this).toggleClass("is-active").children(".accordion-panel").slideToggle("swing")
})
$(".accordion > .accordion-item > .accordion_body").keydown(function(e) {
  if (e.keyCode === 13) {
    $(this).toggleClass("is-active").children(".accordion-panel").slideToggle("swing")
  }
})