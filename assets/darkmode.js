const userPref = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
const currentTheme = localStorage.getItem('theme') ?? userPref

// last visit animation calculations
const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
const lastVisit = localStorage.getItem('lastVisitTime')
const now = Date.now()
let show = 'true'
if (lastVisit) {
  document.documentElement.setAttribute('visited', 'true')
  const minElapsed = Math.ceil((now - parseInt(lastVisit)) / (1000 * 60))
  show = (!isReducedMotion && minElapsed > 5) ? 'true' : 'false'
}
document.documentElement.setAttribute('show-animation', show)
localStorage.setItem('lastVisitTime', `${now}`)

if (currentTheme) {
  document.documentElement.setAttribute('saved-theme', currentTheme);
}

const switchTheme = (e) => {
  if (e.target.checked) {
    document.documentElement.setAttribute('saved-theme', 'dark')
    localStorage.setItem('theme', 'dark')
  }
  else {
    document.documentElement.setAttribute('saved-theme', 'light')
    localStorage.setItem('theme', 'light')
  }
}

window.addEventListener('DOMContentLoaded', () => {
  // Darkmode toggle
  const toggleSwitch = document.querySelector('#darkmode-toggle')

  // listen for toggle
  toggleSwitch.addEventListener('change', switchTheme, false)

  if (currentTheme === 'dark') {
    toggleSwitch.checked = true
  }
})
