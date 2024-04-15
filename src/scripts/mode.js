const mode = document.querySelector('.mode')
mode.onclick = changeMode

const savedTheme = localStorage.getItem('mode')
if (savedTheme && savedTheme != 'dark') {
   changeMode()
}
function changeMode() {
   const body = document.body
   body.classList.toggle('light')
   body.classList.toggle('dark')
   if (body.classList.contains('light')) {
      localStorage.setItem('mode', 'dark')
   } else {
      localStorage.setItem('mode', 'light')
   }
}