module.exports = {
  runFunc,
  taskMenu,
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
