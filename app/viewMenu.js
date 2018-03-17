module.exports = {
  viewMenu,
};
const THEME = require("./themeToggle");

// 'View' Menu Buttons
function viewMenu() {
  const status = document.getElementById("theme").querySelectorAll("span");
  toggleStatus(0, status);
  document.getElementById("theme").addEventListener("click", () => {
    THEME.changeTheme();
  });
  document.getElementById("dev").addEventListener("click", () => {
    remote.getCurrentWindow().toggleDevTools();
  });
  document.getElementById("full").addEventListener("click", () => {
    if (!remote.getCurrentWindow().isMaximized()) {
      remote.getCurrentWindow().maximize();
    } else {
      remote.getCurrentWindow().unmaximize();
    }
  });
}
