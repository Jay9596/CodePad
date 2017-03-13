module.exports = {
  viewMenu
}

// 'View' Menu Buttons
function viewMenu () {
  document.getElementById('dev').addEventListener('click', () => {
    remote.getCurrentWindow().toggleDevTools()
  })
  document.getElementById('full').addEventListener('click', () => {
    if (remote.getCurrentWindow().isFullScreen() == true) {
      remote.getCurrentWindow().setFullScreen(false)
    } else {
      remote.getCurrentWindow().setFullScreen(true)
    }
  })
}
