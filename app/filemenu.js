module.exports = {
  fileMenu,
  newFile,
  handleNewButton,
  handleSave,
handleSaveAs}

function fileMenu () {
  var saveButton = document.getElementById('save')
  saveButton.addEventListener('click', handleSave)
  var saveAsButton = document.getElementById('save_as')
  saveAsButton.addEventListener('click', handleSaveAs)
  document.getElementById('new').addEventListener('click', handleNewButton)
}

function handleSave () {
  if (saveFlag === true) {
    var path = getSavePath()
    // console.log('save path:  ' + path)
    var htmlString = '<html>\n' + '<head>\n' + '<title>CodePad Save</title>\n' + getCssLibs() + '\n<link type="text/css" rel="stylesheet" href="style.css"/>\n' + '</head>\n' + '<body>\n' + html.getValue() + getJsLibs() + '\n<script src="script.js">' + '</script>\n' + '</body>\n' + '</html>'
    // Write HTML
    fs.writeFile(path + '\\index.html', htmlString, (err) => {
      if (err) {
        console.error(err)
      }
    // console.log('success HTML')
    })
    // Write CSS
    fs.writeFile(path + '\\style.css', css.getValue(), (err) => {
      if (err) {
        console.error(err)
      }
    // console.log('success CSS')
    })
    // Write JS
    fs.writeFile(path + '\\script.js', js.getValue(), (err) => {
      if (err) {
        console.error(err)
      }
    // console.log('success JS')
    })
    // TODO: No error checking is done here, fix it
    for (var j = 0; j < styFlags.length; j++) {
      if (styFlags[j] === 1) {
        fs.createReadStream('lib/' + cssLib[j][0]).pipe(fs.createWriteStream(path + '/' + cssLib[j][0]))
      }
    }
    for (var i = 0; i < scrFlags.length; i++) {
      if (scrFlags[i] === 1) {
        fs.createReadStream('lib/' + jsLib[i][0]).pipe(fs.createWriteStream(path + '/' + jsLib[i][0]))
      }
    }

    dialog.showMessageBox({
      message: 'Saved to ' + path + '\\',
      buttons: ['OK']
    })
  } else {
    handleSaveAs()
  }
}

function handleSaveAs () {
  var path = dialog.showOpenDialog({
    properties: ['openDirectory']
  })
  if (path === undefined) {
    /*dialog.showMessageBox({
      message: 'Cancelled :(',
      buttons: ['OK']
    })
    */
  } else {
    saveFlag = true
    setSavePath(path)
    handleSave()
  }
}

function newFile () {
  fileEntry = null
  hasWriteAccess = false
}

function handleNewButton (i) {
  if (false) {
    newFile()
    editor[i].setValue('')
  } else {
    window.open(path.join('file://', __dirname, '/index.html'))
  }
}
