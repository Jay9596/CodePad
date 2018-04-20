const cheerio = require('cheerio');

module.exports = {
  fileMenu,
  newFile,
  handleOpen,
  handleNew,
  handleSave,
  handleSaveAs,
};
let saveFlag, openFlag;
const getSavePath = () => savePath;
const setSavePath = path => {
  savePath = path;
};


function fileMenu() {
  document.getElementById("open").addEventListener("click", handleOpen);
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

function handleOpen() {
  const path = dialog.showOpenDialog({
    properties: ["openDirectory"],
  });
  if (path !== undefined) {
    saveFlag = true;
    setSavePath(path);
    readData(path);
  }
}

function readData(path) {
  fs.readFile(path+"/index.html", 'utf-8', function(err, data) {
    if (err) throw err;

    const $ = cheerio.load(data);
    console.log($('body').html());
    // console.log(data);

    html.setValue($('body').html());
  });

  fs.readFile(path+"/style.css", 'utf-8', function(err, data) {
    if (err) throw err;
    console.log(data);
    css.setValue(data);
  });
  
  fs.readFile(path+"/script.js", 'utf-8', function(err, data) {
    if (err) throw err;
    console.log(data);
    js.setValue(data);
  });
}

function handleSaveAs() {
  const path = dialog.showOpenDialog({
    properties: ["openDirectory"],
  });
  if (path !== undefined) {
    saveFlag = true;
    setSavePath(path);
    handleSave();
  }
}

function handleSave() {
  if (saveFlag === true) {
    const path = getSavePath();
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
    fs.writeFile(path + "\\index.html", htmlString, err => {
      if (err) {
        console.error(err);
      }
    });
    fs.writeFile(path + "\\style.css", css.getValue(), err => {
      if (err) {
        console.error(err);
      }
    });
    fs.writeFile(path + "\\script.js", js.getValue(), err => {
      if (err) {
        console.error(err);
      }
    });
    for (let j = 0; j < styFlags.length; j++) {
      if (styFlags[j] === 1) {
        fs
          .createReadStream("resources/app.asar/app/lib/" + cssLib[j][0])
          .pipe(fs.createWriteStream(path + "/" + cssLib[j][0]));
        if (j === 1) {
          fs
            .createReadStream(
              "resources/app.asar/app/lib/glyphicons-halflings-regular.eot",
            )
            .pipe(
              fs.createWriteStream(path + "/glyphicons-halflings-regular.eot"),
            );
          fs
            .createReadStream(
              "resources/app.asar/app/lib/glyphicons-halflings-regular.ttf",
            )
            .pipe(
              fs.createWriteStream(path + "/glyphicons-halflings-regular.tff"),
            );
          fs
            .createReadStream(
              "resources/app.asar/app/lib/glyphicons-halflings-regular.woff",
            )
            .pipe(
              fs.createWriteStream(path + "/glyphicons-halflings-regular.woff"),
            );
          fs
            .createReadStream(
              "resources/app.asar/app/lib/glyphicons-halflings-regular.woff2",
            )
            .pipe(
              fs.createWriteStream(
                path + "/glyphicons-halflings-regular.woff2",
              ),
            );
        }
        if (j === 2) {
          fs
            .createReadStream(
              "resources/app.asar/app/lib/fontawesome-webfont.ttf",
            )
            .pipe(fs.createWriteStream(path + "/fontawesome-webfont.ttf"));
          fs
            .createReadStream(
              "resources/app.asar/app/lib/fontawesome-webfont.woff",
            )
            .pipe(fs.createWriteStream(path + "/fontawesome-webfont.woff"));
          fs
            .createReadStream(
              "resources/app.asar/app/lib/fontawesome-webfont.woff2",
            )
            .pipe(fs.createWriteStream(path + "/fontawesome-webfont.woff2"));
        }
      }
    }
    for (let i = 0; i < scrFlags.length; i++) {
      if (scrFlags[i] === 1) {
        fs
          .createReadStream("resources/app.asar/app/lib/" + jsLib[i][0])
          .pipe(fs.createWriteStream(path + "/" + jsLib[i][0]));
      }
    }
    dialog.showMessageBox({
      message: "Saved to " + path + "\\",
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
