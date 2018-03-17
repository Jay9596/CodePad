
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

  const BrowserWindow = electron.remote.BrowserWindow
  document.getElementById('diff').addEventListener('click', () => {
    const modalPath = path.join('file://',__dirname,'diffView.html')
        let win = new BrowserWindow({ frame: true, transparent: true, width: 400, height: 200})
        win.on('close',function() { win = null })
        win.loadURL(modalPath)
        win.show()

  })
}
