const path = require('path');

module.exports = {
  fileMenu,
  newFile,
  handleNew,
  handleSave,
  handleSaveAs
}
let saveFlag
const getSavePath = () => savePath
const setSavePath = (filePath) => {
  savePath = filePath
}

function fileMenu () {
  document.getElementById('save').addEventListener('click', handleSave)
  document.getElementById('save-as').addEventListener('click', handleSaveAs)
  document.getElementById('new').addEventListener('click', handleNew)
  document.getElementById('close-window').addEventListener('click', function (e) {
    window.close()
  })
}

function handleNew (i) {
  if (false) {
    newFile()
    editor[i].setValue('')
  } else {
    window.open(path.join('file://', __dirname, '/index.html'))
  }
}

function handleSaveAs () {
  var filePath = dialog.showOpenDialog({
    properties: ['openDirectory']
  })
  if (filePath !== undefined) {
    saveFlag = true
    setSavePath(filePath)
    handleSave()
  }
}

function handleSave () {
  if (saveFlag === true) {
    var filePath = getSavePath()
    // console.log('save path:  ' + filePath)
    var htmlString = '<html>\n' + '<head>\n' + '<title>CodePad Save</title>\n' + CSSMenu.getCssLibs() + '\n<link type="text/css" rel="stylesheet" href="style.css"/>\n' + '</head>\n' + '<body>\n' + html.getValue() + JSMenu.getJsLibs() + '\n<script src="script.js">' + '</script>\n' + '</body>\n' + '</html>'
    // Write HTML
    fs.writeFile(path.join(filePath + '/index.html'), htmlString, (err) => {
      if (err) {
        console.error(err)
      }
      // console.log('success HTML')
    })
    // Write CSS
    fs.writeFile(path.join(filePath + '/style.css'), css.getValue(), (err) => {
      if (err) {
        console.error(err)
      }
      // console.log('success CSS')
    })
    // Write JS
    fs.writeFile(path.join(filePath + '/script.js'), js.getValue(), (err) => {
      if (err) {
        console.error(err)
      }
      // console.log('success JS')
    })
    for (var j = 0; j < styFlags.length; j++) {
      if (styFlags[j] === 1) {
        fs.createReadStream('resources/app.asar/app/lib/' + cssLib[j][0]).pipe(fs.createWriteStream(path.join(filePath + '/' + cssLib[j][0])))
        if (j === 1) {
          fs.createReadStream('resources/app.asar/app/lib/glyphicons-halflings-regular.eot').pipe(fs.createWriteStream(path.join(filePath + '/glyphicons-halflings-regular.eot')))
          fs.createReadStream('resources/app.asar/app/lib/glyphicons-halflings-regular.ttf').pipe(fs.createWriteStream(path.join(filePath + '/glyphicons-halflings-regular.tff')))
          fs.createReadStream('resources/app.asar/app/lib/glyphicons-halflings-regular.woff').pipe(fs.createWriteStream(path.join(filePath + '/glyphicons-halflings-regular.woff')))
          fs.createReadStream('resources/app.asar/app/lib/glyphicons-halflings-regular.woff2').pipe(fs.createWriteStream(path.join(filePath + '/glyphicons-halflings-regular.woff2')))
        }
        if (j === 2) {
          fs.createReadStream('resources/app.asar/app/lib/fontawesome-webfont.ttf').pipe(fs.createWriteStream(path.join(filePath + '/fontawesome-webfont.ttf')))
          fs.createReadStream('resources/app.asar/app/lib/fontawesome-webfont.woff').pipe(fs.createWriteStream(path.join(filePath + '/fontawesome-webfont.woff')))
          fs.createReadStream('resources/app.asar/app/lib/fontawesome-webfont.woff2').pipe(fs.createWriteStream(path.join(filePath + '/fontawesome-webfont.woff2')))
        }
      }
    }
    for (var i = 0; i < scrFlags.length; i++) {
      if (scrFlags[i] === 1) {
        fs.createReadStream('resources/app.asar/app/lib/' + jsLib[i][0]).pipe(fs.createWriteStream(path.join(filePath + '/' + jsLib[i][0])))
      }
    }
    dialog.showMessageBox({
      message: 'Saved to ' + path.join(filePath + '/'),
      buttons: ['OK']
    })
  } else {
    handleSaveAs()
  }
}

function newFile () {
  fileEntry = null
  hasWriteAccess = false
}
