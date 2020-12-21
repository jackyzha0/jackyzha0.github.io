// Darkmode toggle
const toggleSwitch = document.querySelector('#darkmode-toggle')
const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null

if (currentTheme) {
    document.documentElement.setAttribute('saved-theme', currentTheme);
    if (currentTheme === 'dark') {
        toggleSwitch.checked = true
    }
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

// listen for toggle
toggleSwitch.addEventListener('change', switchTheme, false)