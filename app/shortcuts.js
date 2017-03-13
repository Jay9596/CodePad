module.exports = {
shortcuts}

function shortcuts () {
  var keys = {}
  window.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'Tab') {
      toggleEditors(getCurrenEditor())
    }
    if (e.key === 'F12') {
      remote.getCurrentWindow().toggleDevTools()
    }
    if (e.ctrlKey && (e.key === 's' || e.key === 'S')) {
      FILE.handleSave()
    }
    if (e.ctrlKey && (e.key === 'n' || e.key === 'N')) {
      FILE.handleNewButton()
    }
  })
}
