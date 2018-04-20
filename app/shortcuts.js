module.exports = {
  shortcuts,
};

function shortcuts() {
  window.addEventListener("keydown", e => {
    if (e.ctrlKey && e.key === "Tab") {
      toggleEditors(getCurrenEditor());
    }
    if (e.key === "F11") {
      if (!remote.getCurrentWindow().isMaximized()) {
        remote.getCurrentWindow().maximize();
      } else {
        remote.getCurrentWindow().unmaximize();
      }
    }
    if (e.key === "F12") {
      remote.getCurrentWindow().toggleDevTools();
    }
    if (e.key === "F6") {
      paint();
    }
    if (e.ctrlKey && (e.key === "s" || e.key === "S")) {
      FILE.handleSave();
    }
    if (e.ctrlKey && (e.key === "n" || e.key === "N")) {
      FILE.handleNew();
    }
    if (e.ctrlKey && (e.key === "o" || e.key === "O")) {
      FILE.handleOpen();
    }
  });
}
