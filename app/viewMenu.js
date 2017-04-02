module.exports = {
  viewMenu
}
const THEME = require('./appearance')

// 'View' Menu Buttons
function viewMenu () {
  document.getElementById('dev').addEventListener('click', () => {
    remote.getCurrentWindow().toggleDevTools()
  })
  document.getElementById('full').addEventListener('click', () => {
    if (!remote.getCurrentWindow().isMaximized()) {
      remote.getCurrentWindow().maximize()
    } else {
      remote.getCurrentWindow().unmaximize()
    }
  })
  var status = document.getElementById('theme').querySelectorAll('span')
  toggleStatus(0,status)
  document.getElementById('theme').addEventListener('click', () => {
    THEME.changeTheme()
  })
}
