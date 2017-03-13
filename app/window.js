module.exports = {
  windowControls,
  helpInit,
initContextMenu}

function windowControls () {
  document.getElementById('min-button').addEventListener('click', function (e) {
    const window = remote.getCurrentWindow()
    window.minimize()
  })

  document.getElementById('max-button').addEventListener('click', function (e) {
    const window = remote.getCurrentWindow()
    if (!window.isMaximized()) {
      window.maximize()
    } else {
      window.unmaximize()
    }
  })

  document.getElementById('close-button').addEventListener('click', function (e) {
    const window = remote.getCurrentWindow()
    window.close()
  })
}

function helpInit () {
  var helpMenu = document.getElementById('help-menu')
  var helpa = helpMenu.getElementsByTagName('a')
  for (var i = 0; i < helpa.length; i++) {
    helpa[i].addEventListener('click', function (e) {
      e.preventDefault()
      shell.openExternal(this.href)
    })
  }
}

// Context menu init()
function initContextMenu () {
  menu = new Menu()
  menu.append(new MenuItem({
    label: 'Copy',
    role: 'copy'
  // click: copy
  }))
  menu.append(new MenuItem({
    label: 'Cut',
    role: 'cut'
  // click: cut
  }))
  menu.append(new MenuItem({
    label: 'Paste',
    role: 'paste'
  // click: paste
  }))

  window.addEventListener('contextmenu', function (ev) {
    ev.preventDefault()
    menu.popup(remote.getCurrentWindow(), ev.x, ev.y)
  }, false)
}
