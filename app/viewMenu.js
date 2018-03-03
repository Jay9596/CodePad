const Dialogs = require('dialogs')
var dialogs = Dialogs(opts = {})


module.exports = {
  viewMenu,
  getConnection,
}
const THEME = require('./appearance')

var socketConn

// 'View' Menu Buttons
function viewMenu() {
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
  toggleStatus(0, status)
  document.getElementById('theme').addEventListener('click', () => {
    THEME.changeTheme()
  })
  // Connect prompt
  document.getElementById('connect').addEventListener('click', () => {
    console.log("Connect pressed")
    var host = ""
    dialogs.prompt("IP? ", "127.0.0.1:8080", (ok) => {
      console.info("connect", ok)
      host = ok
      var url = 'http://' + host
      console.log("URL: " + url)
      var socket = require('socket.io-client')(url)
      console.log(socket)
      socketConn = socket
      if (socketConn != undefined) {
        dialogs.alert("Connection Succesful")
      } 
    })
  })
}

function getConnection() {
  if (socketConn != undefined) {
    return socketConn
  }
  return ""
}
