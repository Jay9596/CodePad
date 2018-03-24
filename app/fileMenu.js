const path = require('path');

module.exports = {
  fileMenu,
  newFile,
  handleNew,
  handleSave,
  handleSaveAs,
};
let saveFlag;
const getSavePath = () => savePath;
const setSavePath = (filepath) => {
  savePath = filepath;
};

function fileMenu() {
  document.getElementById("save").addEventListener("click", handleSave);
  document.getElementById("save-as").addEventListener("click", handleSaveAs);
  document.getElementById("new").addEventListener("click", handleNew);
  document.getElementById("close-window").addEventListener("click", e => {
    window.close();
  });
}

function handleNew(i) {
  if (false) {
    newFile();
    editor[i].setValue("");
  } else {
    window.open(path.join("file://", __dirname, "/index.html"));
  }
}

function handleSaveAs() {
  const filepath = dialog.showOpenDialog({
    properties: ["openDirectory"],
  });
  if (filepath !== undefined) {
    saveFlag = true;
    setSavePath(filepath);
    handleSave();
  }
}

function handleSave() {
  if (saveFlag === true) {
    const filepath = getSavePath();
    const htmlString =
      "<html>\n" +
      "<head>\n" +
      "<title>Saved from CodePade</title>\n" +
      CSSMenu.getCssLibs() +
      '\n<link type="text/css" rel="stylesheet" href="style.css"/>\n' +
      "</head>\n" +
      "<body>\n" +
      html.getValue() +
      JSMenu.getJsLibs() +
      '\n<script src="script.js">' +
      "</script>\n" +
      "</body>\n" +
      "</html>";
    fs.writeFile(path.join(filepath + '/index.html'), htmlString, err => {
      if (err) {
        console.error(err);
      }
    });
    fs.writeFile(path.join(filepath + '/style.css'), css.getValue(), err => {
      if (err) {
        console.error(err);
      }
    });
    fs.writeFile(path.join(filepath + '/script.js'), js.getValue(), err => {
      if (err) {
        console.error(err);
      }
    });
    for (let j = 0; j < styFlags.length; j++) {
      if (styFlags[j] === 1) {
        fs
          .createReadStream("resources/app.asar/app/lib/" + cssLib[j][0])
          .pipe(fs.createWriteStream(path.join(filepath + "/" + cssLib[j][0])));
        if (j === 1) {
          fs
            .createReadStream(
              "resources/app.asar/app/lib/glyphicons-halflings-regular.eot",
          )
            .pipe(
              fs.createWriteStream(path.join(filepath + "/glyphicons-halflings-regular.eot")),
          );
          fs
            .createReadStream(
              "resources/app.asar/app/lib/glyphicons-halflings-regular.ttf",
          )
            .pipe(
              fs.createWriteStream(path.join(filepath + "/glyphicons-halflings-regular.tff")),
          );
          fs
            .createReadStream(
              "resources/app.asar/app/lib/glyphicons-halflings-regular.woff",
          )
            .pipe(
              fs.createWriteStream(path.join(filepath + "/glyphicons-halflings-regular.woff")),
          );
          fs
            .createReadStream(
              "resources/app.asar/app/lib/glyphicons-halflings-regular.woff2",
          )
            .pipe(
              fs.createWriteStream(
                path.join(filepath + "/glyphicons-halflings-regular.woff2"),
              ),
          );
        }
        if (j === 2) {
          fs
            .createReadStream(
              "resources/app.asar/app/lib/fontawesome-webfont.ttf",
          )
            .pipe(fs.createWriteStream(path.join(filepath + "/fontawesome-webfont.ttf")));
          fs
            .createReadStream(
              "resources/app.asar/app/lib/fontawesome-webfont.woff",
          )
            .pipe(fs.createWriteStream(path.join(filepath + "/fontawesome-webfont.woff")));
          fs
            .createReadStream(
              "resources/app.asar/app/lib/fontawesome-webfont.woff2",
          )
            .pipe(fs.createWriteStream(path.join(filepath + "/fontawesome-webfont.woff2")));
        }
      }
    }
    for (let i = 0; i < scrFlags.length; i++) {
      if (scrFlags[i] === 1) {
        fs
          .createReadStream("resources/app.asar/app/lib/" + jsLib[i][0])
          .pipe(fs.createWriteStream(path.join(filepath + "/" + jsLib[i][0])));
      }
    }
    dialog.showMessageBox({
      message: "Saved to " + path.join(filepath + '/'),
      buttons: ["OK"],
    });
  } else {
    handleSaveAs();
  }
}

function newFile() {
  fileEntry = null;
  hasWriteAccess = false;
}
