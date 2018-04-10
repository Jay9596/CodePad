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
  document.getElementById("connect").addEventListener("click", () => { getIP(callback) });
}

function getIP(callback) {
  console.log("GET IP: 5000");
  // TODO:
  // ADD Functionality here  to get a IP string from user and validate.
  callback("http://localhost:5000");
}
