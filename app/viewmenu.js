module.exports = {
viewMenu}

function viewMenu () {
  var devTools = document.getElementById('dev')
  devTools.addEventListener('click', () => {
    remote.getCurrentWindow().toggleDevTools()
  })
}
