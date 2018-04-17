module.exports = {
  runFunc,
  taskMenu,
  getUserConnect,
};

function taskMenu() {
  var autoRunButton = document.getElementById("auto-run");
  autoRunButton.addEventListener("click", setAutoRun);
}

function runFunc(fn) {
  document.getElementById("exec").addEventListener("click", fn);
}

function setAutoRun() {
  var autoButton = document.getElementById("auto-run");
  var autoStatus = autoButton.querySelectorAll("span");
  toggleStatus(0, autoStatus);
  autoRun = !autoRun;
}

function getUserConnect(callback) {
  document.getElementById("connect").addEventListener("click", () => { showDialog(callback) });
}

function showDialog(callback) {
  vex.defaultOptions.className = 'vex-theme-os';
  vex.dialog.open({
    message: 'Enter IP to connect to other system.',
    input: '<input type="text" name="ip"/>',
    buttons: [
      $.extend({}, vex.dialog.buttons.YES, {
        text: 'Connect'
      }),
      $.extend({}, vex.dialog.buttons.NO, {
        text: 'Cancel'
      })
    ],
    callback: function(data) {
      if (data) {
        console.log(data);
        getIP(data);
      }
    }
  });
}

function getIP(callback) {
  console.log("GET IP: 5000");
  // TODO:
  // ADD Functionality here  to get a IP string from user and validate.
  callback("http://localhost:5000");
}
