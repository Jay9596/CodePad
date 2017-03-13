// 1. Declarations and Node Modules Import
const electron = require('electron')
const path = require('path')
const shell = electron.shell
const remote = electron.remote
const fs = require('fs')
const {
  dialog,
  Menu,
  MenuItem
} = remote

var scripts = ''
var styles = ''
var currentEditor = ''
var editor = []
var menu, output, html, css, js, editorLabels
var saveFlag = false
var savePath = ''
var styFlags = [0, 0, 0]
var scrFlags = [0, 0, 0, 0, 0]

// 2. CSS/JS Libraries
var cssLib = [
  ['animate.css', "<link rel='stylesheet' type='text/css' href='lib/animate.css'>"],
  ['bootstrap.min.css', "<link rel='stylesheet' type='text/css' href='lib/bootstrap.min.css'>"],
  ['font-awesome.min.css', "<link rel='stylesheet' type='text/css' href='lib/font-awesome.min.css'>"]
]

var jsLib = [
  ['jquery-3.1.1.min.js', "<script src='lib/jquery-3.1.1.min.js'></script>"],
  ['anime.min.js', "<script src='lib/anime.min.js'></script>"],
  ['bootstrap.min.js', "<script src='lib/bootstrap.min.js'></script>"],
  ['p5.min.js', "<script src='lib/p5.min.js'></script>"],
  ['three.min.js', "<script src='lib/three.min.js'></script>"]
]

// 3. Main Functions for Electron
onload = function () {
  // Intialize Context Menu
  initContextMenu()

  // CodeMirror Initialize Editors
  editor[0] = CodeMirror(
    document.getElementById('html-editor'), {
      mode: {
        name: 'htmlmixed'
      },
      lineNumbers: true,
      lineWrapping: true,
      autofocus: true,
      indentWithTabs: false,
      indentUnit: 2,
      smartIndent: true,
      scrollbarStyle: 'overlay',
      theme: 'base16-ocean-dark'
    })

  editor[1] = CodeMirror(
    document.getElementById('css-editor'), {
      mode: {
        name: 'css'
      },
      lineNumbers: true,
      lineWrapping: true,
      indentWithTabs: false,
      indentUnit: 2,
      smartIndent: true,
      scrollbarStyle: 'overlay',
      theme: 'base16-ocean-dark'
    })

  editor[2] = CodeMirror(
    document.getElementById('js-editor'), {
      mode: {
        name: 'javascript',
        json: true
      },
      lineNumbers: true,
      lineWrapping: true,
      indentWithTabs: false,
      indentUnit: 2,
      smartIndent: true,
      scrollbarStyle: 'overlay',
      theme: 'base16-ocean-dark'
    })

  html = editor[0]
  css = editor[1]
  js = editor[2]

  // Output refresh and editor focus
  output = document.getElementById('output')
  editorLabels = document.getElementsByClassName('editor-label')

  for (var k = 0; k < 3; k++) {
    editor[k].on('change', function (change) {
      paint()
    })
  }

  html.on('focus', function (change) {
    removeFocus(editorLabels)
    editorLabels[0].classList.add('editor-focus')
  })

  css.on('focus', function (change) {
    removeFocus(editorLabels)
    editorLabels[1].classList.add('editor-focus')
  })

  js.on('focus', function (change) {
    removeFocus(editorLabels)
    editorLabels[2].classList.add('editor-focus')
  })

  clicks()
  addScript()
  addStyle()
  newFile()
  onresize()
}

// 4. Function call on click events
function clicks () {
  var window = remote.getCurrentWindow()

  // Open links in the 'Help' menu in the default browser
  var helpMenu = document.getElementById('help-menu')
  var helpa = helpMenu.getElementsByTagName('a')
  for (var i = 0; i < helpa.length; i++) {
    helpa[i].addEventListener('click', function (e) {
      e.preventDefault()
      shell.openExternal(this.href)
    })
  }

  // Window Control [_][+][x] Buttons
  document.getElementById('min-button').addEventListener('click', function (e) {
    window.minimize()
  })
  document.getElementById('max-button').addEventListener('click', function (e) {
    if (!remote.getCurrentWindow().isMaximized()) {
      window.maximize()
    } else {
      window.unmaximize()
    }
  })
  document.getElementById('close-button').addEventListener('click', function (e) {
    window.close()
  })

  // 'File' Menu Buttons
  document.getElementById('new').addEventListener('click', handleNew)
  document.getElementById('save').addEventListener('click', handleSave)
  document.getElementById('save-as').addEventListener('click', handleSaveAs)
  document.getElementById('close-window').addEventListener('click', function (e) {
    window.close()
  })

  // 'View' Menu Buttons
  document.getElementById('dev').addEventListener('click', () => {
    remote.getCurrentWindow().toggleDevTools()
  })
  document.getElementById('full').addEventListener('click', () => {
    if (remote.getCurrentWindow().isFullScreen() == true) {
      remote.getCurrentWindow().setFullScreen(false)
    } else {
      remote.getCurrentWindow().setFullScreen(true)
    }
  })

  // Misc Keyboard Shortcuts
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'Tab') {
      toggleEditors(getCurrenEditor())
    }
    if (e.key === 'F11') {
      if (remote.getCurrentWindow().isFullScreen() == true) {
        remote.getCurrentWindow().setFullScreen(false)
      } else {
        remote.getCurrentWindow().setFullScreen(true)
      }
    }
    if (e.key === 'F12') {
      remote.getCurrentWindow().toggleDevTools()
    }
    if (e.ctrlKey && (e.key === 's' || e.key === 'S')) {
      handleSave()
    }
    if (e.ctrlKey && (e.key === 'n' || e.key === 'N')) {
      handleNew()
    }
  })
}

// 5. Editor Functions
const getScr = () => scripts
const getSty = () => styles
const getCurrenEditor = () => {
  getEditor()
  return currentEditor
}
const getSavePath = () => savePath
const setSavePath = (path) => {
  savePath = path
}

function getEditor () {
  if (html.hasFocus()) {
    currentEditor = html
  }
  if (css.hasFocus()) {
    currentEditor = css
  }
  if (js.hasFocus()) {
    currentEditor = js
  }
}

function toggleEditors (editorI) {
  if (editorI === html) {
    css.focus()
  }
  if (editorI === css) {
    js.focus()
  }
  if (editorI === js) {
    html.focus()
  }
}

function newFile () {
  fileEntry = null
  hasWriteAccess = false
}

function handleNew (i) {
  if (false) {
    newFile()
    editor[i].setValue('')
  } else {
    window.open(path.join('file://', __dirname, '/index.html'))
  }
}

// Context Menu
function initContextMenu () {
  menu = new Menu()
  menu.append(new MenuItem({
    label: 'Copy',
    role: 'copy'
  }))
  menu.append(new MenuItem({
    label: 'Cut',
    role: 'cut'
  }))
  menu.append(new MenuItem({
    label: 'Paste',
    role: 'paste'
  }))
  window.addEventListener('contextmenu', function (ev) {
    ev.preventDefault()
    menu.popup(remote.getCurrentWindow(), ev.x, ev.y)
  }, false)
}

// Remove editor-focus class
function removeFocus (editor) {
  for (var i = 0; i < editor.length; i++) {
    editor[i].classList.remove('editor-focus')
  }
}

// Refresh on resize
onresize = function () {
  for (var i = 0; i < 3; i++) {
    editor[i].refresh()
  }
}

function paint () {
  output.srcdoc = '<html>' + '<head>' + getSty() + '<style>' + 'body{border:0;padding:0}' + css.getValue() + '</style>' + '</head>' + '<body>' + html.getValue() + getScr() + '<script>' + js.getValue() + '</script>' + '</body>' + '</html>'
}

// 6. Save the snippet functions
function toggleStatus (i, span) {
  if (span[i].classList.contains('status-active')) {
    span[i].classList.remove('status-active')
  } else {
    span[i].classList.add('status-active')
  }
}

function getCssLibs () {
  var cssHtml = ''
  for (var i = 0; i < cssLib.length; i++) {
    if (styFlags[i] === 1) {
      cssHtml += cssLib[i][1].replace('lib/', '')
    }
  }
  return cssHtml
}

function getJsLibs () {
  var jsHtml = ''
  for (var i = 0; i < jsLib.length; i++) {
    if (scrFlags[i] === 1) {
      jsHtml += jsLib[i][1].replace('lib/', '')
    }
  }
  return jsHtml
}

function handleSave () {
  if (saveFlag === true) {
    var path = getSavePath()
    var htmlString = '<html>\n' + '<head>\n' + '<title>CodePad Save</title>\n' + getCssLibs() + '<link type="text/css" rel="stylesheet" href="style.css"/>\n' + '</head>\n' + '<body>\n' + html.getValue() + getJsLibs() + '\n<script src="script.js">' + '</script>\n' + '</body>\n' + '</html>'
    fs.writeFile(path + '\\index.html', htmlString, (err) => {
      if (err) {
        console.error(err)
      }
    })
    fs.writeFile(path + '\\style.css', css.getValue(), (err) => {
      if (err) {
        console.error(err)
      }
    })
    fs.writeFile(path + '\\script.js', js.getValue(), (err) => {
      if (err) {
        console.error(err)
      }
    })
    for (var j = 0; j < styFlags.length; j++) {
      if (styFlags[j] === 1) {
        fs.createReadStream('resources/app.asar/app/lib/' + cssLib[j][0]).pipe(fs.createWriteStream(path + '/' + cssLib[j][0]))
        if (j === 1) {
          fs.createReadStream('resources/app.asar/app/lib/glyphicons-halflings-regular.eot').pipe(fs.createWriteStream(path + '/glyphicons-halflings-regular.eot'))
          fs.createReadStream('resources/app.asar/app/lib/glyphicons-halflings-regular.ttf').pipe(fs.createWriteStream(path + '/glyphicons-halflings-regular.tff'))
          fs.createReadStream('resources/app.asar/app/lib/glyphicons-halflings-regular.woff').pipe(fs.createWriteStream(path + '/glyphicons-halflings-regular.woff'))
          fs.createReadStream('resources/app.asar/app/lib/glyphicons-halflings-regular.woff2').pipe(fs.createWriteStream(path + '/glyphicons-halflings-regular.woff2'))
        }
        if (j === 2) {
          fs.createReadStream('resources/app.asar/app/lib/fontawesome-webfont.ttf').pipe(fs.createWriteStream(path + '/fontawesome-webfont.ttf'))
          fs.createReadStream('resources/app.asar/app/lib/fontawesome-webfont.woff').pipe(fs.createWriteStream(path + '/fontawesome-webfont.woff'))
          fs.createReadStream('resources/app.asar/app/lib/fontawesome-webfont.woff2').pipe(fs.createWriteStream(path + '/fontawesome-webfont.woff2'))
        }
      }
    }
    for (var i = 0; i < scrFlags.length; i++) {
      if (scrFlags[i] === 1) {
        fs.createReadStream('resources/app.asar/app/lib/' + jsLib[i][0]).pipe(fs.createWriteStream(path + '/' + jsLib[i][0]))
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
  if (path !== undefined) {
    saveFlag = true
    setSavePath(path)
    handleSave()
  }
}

function addScript () {
  var jsMenu = document.getElementById('js-menu')
  var jsButtons = jsMenu.getElementsByTagName('a')
  let jsSpan = jsMenu.querySelectorAll('span')
  jsButtons[0].addEventListener('click', function (e) {
    var jqScr = jsLib[0][1]
    if (scrFlags[0] === 0) {
      scripts += jqScr
      scrFlags[0] = 1
      toggleStatus(0, jsSpan)
    } else if (scrFlags[2] === 0) {
      scripts = scripts.replace(jqScr, '')
      scrFlags[0] = 0
      toggleStatus(0, jsSpan)
    }
  })
  jsButtons[1].addEventListener('click', function (e) {
    var aniScr = jsLib[1][1]
    if (scrFlags[1] === 0) {
      scripts += aniScr
      scrFlags[1] = 1
      toggleStatus(1, jsSpan)
    } else {
      scripts = scripts.replace(aniScr, '')
      scrFlags[1] = 0
      toggleStatus(1, jsSpan)
    }
  })
  jsButtons[2].addEventListener('click', function (e) {
    var jqScr = jsLib[0][1]
    var boScr = jsLib[2][1]
    if (scrFlags[0] === 0) {
      toggleStatus(0, jsSpan)
      scripts += jqScr
      scrFlags[0] = 1
    }
    if (scrFlags[2] === 0) {
      scripts += boScr
      scrFlags[2] = 1
      toggleStatus(2, jsSpan)
    } else {
      scripts = scripts.replace(boScr, '')
      scrFlags[2] = 0
      toggleStatus(2, jsSpan)
    }
  })
  jsButtons[3].addEventListener('click', function (e) {
    var p5Scr = jsLib[3][1]
    if (scrFlags[3] === 0) {
      scripts += p5Scr
      scrFlags[3] = 1
      toggleStatus(3, jsSpan)
    } else {
      scripts = scripts.replace(p5Scr, '')
      scrFlags[3] = 0
      toggleStatus(3, jsSpan)
    }
  })
  jsButtons[4].addEventListener('click', function (e) {
    var thScr = jsLib[4][1]
    if (scrFlags[4] === 0) {
      scripts += thScr
      scrFlags[4] = 1
      toggleStatus(4, jsSpan)
    } else {
      scripts = scripts.replace(thScr, '')
      scrFlags[4] = 0
      toggleStatus(4, jsSpan)
    }
  })
};

function addStyle () {
  var cssMenu = document.getElementById('css-menu')
  var cssButtons = cssMenu.getElementsByTagName('a')
  let cssSpan = cssMenu.querySelectorAll('span')
  cssButtons[0].addEventListener('click', function (e) {
    var anSty = cssLib[0][1]
    if (styFlags[0] === 0) {
      styles += anSty
      styFlags[0] = 1
      toggleStatus(0, cssSpan)
    } else {
      styles = styles.replace(anSty, '')
      styFlags[0] = 0
      toggleStatus(0, cssSpan)
    }
  })
  cssButtons[1].addEventListener('click', function (e) {
    var boSty = cssLib[1][1]
    if (styFlags[1] === 0) {
      styles += boSty
      styFlags[1] = 1
      toggleStatus(1, cssSpan)
    } else {
      styles = styles.replace(boSty, '')
      styFlags[1] = 0
      toggleStatus(1, cssSpan)
    }
  })
  cssButtons[2].addEventListener('click', function (e) {
    var faSty = cssLib[2][1]
    if (styFlags[2] === 0) {
      styles += faSty
      styFlags[2] = 1
      toggleStatus(2, cssSpan)
    } else {
      styles = styles.replace(faSty, '')
      styFlags[2] = 0
      toggleStatus(2, cssSpan)
    }
  })
};
