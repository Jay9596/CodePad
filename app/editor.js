const electron = require('electron')
const clipboard = electron.clipboard
const path = require('path')
const shell = electron.shell
const remote = electron.remote
//const dialog = require('electron').remote
const {
  dialog,
  Menu,
  MenuItem
} = remote

// Global variables
var scripts = ''
var styles = ''
var currentEditor = ''
var editor = []
var menu, output, html, css, js, editorLabels

// Functions for AddIns
const getScr = () => scripts
const getSty = () => styles
const getCurEditor = () => {
  getEditor()
  return currentEditor
}

function getEditor () {
  if (html.hasFocus()) {
    currentEditor = html
    console.warn('html')
  }
  if (css.hasFocus()) {
    currentEditor = css
    console.warn('css')
  }
  if (js.hasFocus()) {
    currentEditor = js
    console.warn('js')
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

// Context menu init()
function initContextMenu () {
  menu = new Menu()
  menu.append(new MenuItem({
    label: 'Copy',
    click: function () {
      var editor = getCurEditor()
      console.info(editor)
      var text = editor.getSelection()
      clipboard.writeText(text)
    }
  }))
  menu.append(new MenuItem({
    label: 'Cut',
    click: function () {
      var editor = getCurEditor()
      console.info(editor)
      var text = editor.getSelection()
      clipboard.writeText(text)
      editor.replaceSelection('')
    }
  }))
  menu.append(new MenuItem({
    label: 'Paste',
    click: function () {
      var editor = getCurEditor()
      console.info(editor)
      editor.replaceSelection(clipboard.readText())
    }
  }))

  window.addEventListener('contextmenu', function (ev) {
    ev.preventDefault()
    menu.popup(remote.getCurrentWindow(), ev.x, ev.y)
  }, false)
}

// Main Functions for Electron
onload = function () {
  initContextMenu()

  var helpMenu = document.getElementById('help-menu')
  var helpa = helpMenu.getElementsByTagName('a')
  for (var i = 0; i < helpa.length; i++) {
    helpa[i].addEventListener('click', function (e) {
      e.preventDefault()
      shell.openExternal(this.href)
    })
  }

  document.getElementById('min-button').addEventListener('click', function (e) {
    const window = remote.getCurrentWindow()
    window.minimize()
  })

  document.getElementById('max-button').addEventListener('click', function (e) {
    const window = remote.getCurrentWindow()
    if (!window.isMaximized()) {
      window.maximize()
    } else {
      window.unmaximize()
    }
  })

  document.getElementById('close-button').addEventListener('click', function (e) {
    const window = remote.getCurrentWindow()
    window.close()
  })

  document.getElementById('close-window').addEventListener('click', function (e) {
    const window = remote.getCurrentWindow()
    window.close()
  })
  document.getElementById('new').addEventListener('click', handleNewButton)

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

  output = document.getElementById('output')
  editorLabels = document.getElementsByClassName('editor-label')
  html = editor[0]
  css = editor[1]
  js = editor[2]

  html.on('change', function (change) {
    paint()
  })

  css.on('change', function (change) {
    paint()
  })

  js.on('change', function (change) {
    paint()
  })

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

  fileMenu()
  addScript()
  addStyle()
  newFile()
  onresize()
}

function removeFocus (editor) {
  for (var i = 0; i < editor.length; i++) {
    editor[i].classList.remove('editor-focus')
  }
}

onresize = function () {
  for (var i = 0; i < 3; i++) {
    editor[i].refresh()
  }
}

function paint () {
  output.srcdoc = '<html>' + '<head>' + getSty() + '<style>' + 'body{margin:10px;border:0;padding:0}' + css.getValue() + '</style>' + '</head>' + '<body>' + html.getValue() + getScr() + '<script>' + js.getValue() + '</script>' + '</body>' + '</html>'
  console.log(output.srcdoc)
}

function toggleStatus (i, span) {
  if (span[i].classList.contains('status-active')) {
    span[i].classList.remove('status-active')
  } else {
    span[i].classList.add('status-active')
  }
}

function fileMenu()
{
  var saveButton = document.getElementById('save');
  console.warn(saveButton)
}

function addScript () {
  var jsMenu = document.getElementById('js-menu')
  var jsButtons = jsMenu.getElementsByTagName('a')
  let jsSpan = jsMenu.querySelectorAll('span')
  var ScrFlags = [0, 0, 0, 0, 0]
  jsButtons[0].addEventListener('click', function (e) {
    var aniStr = "<script src='lib/anime.min.js'></script>"
    if (ScrFlags[0] === 0) {
      scripts += aniStr
      ScrFlags[0] = 1
      console.log('Anime added!')
      toggleStatus(0, jsSpan)
    } else {
      scripts = scripts.replace(aniStr, '')
      ScrFlags[0] = 0
      console.log('Anime removed!')
      toggleStatus(0, jsSpan)
    }
  })
  jsButtons[1].addEventListener('click', function (e) {
    var jQStr = "<script src='lib/jquery-3.1.1.min.js'>"
    var bootjsStr = "</script><script src='lib/bootstrap.min.js'></script>"
    if (ScrFlags[2] === 0) {
      toggleStatus(2, jsSpan)
      scripts += jQStr
      ScrFlags[2] = 1
      console.log('jQuery added!')
    }
    if (ScrFlags[1] === 0) {
      scripts += bootjsStr
      ScrFlags[1] = 1
      console.log('Bootstrap added!')
      toggleStatus(1, jsSpan)
    } else {
      scripts = scripts.replace(bootjsStr, '')
      ScrFlags[1] = 0
      console.log('Bootstrap removed!')
      toggleStatus(1, jsSpan)
    }
  })
  jsButtons[2].addEventListener('click', function (e) {
    var jQStr = "<script src='lib/jquery-3.1.1.min.js'></script>"
    if (ScrFlags[2] === 0) {
      scripts += jQStr
      ScrFlags[2] = 1
      console.log('jQuery added!')
      toggleStatus(2, jsSpan)
    } else if (ScrFlags[1] === 0) {
      scripts = scripts.replace(jQStr, '')
      ScrFlags[2] = 0
      console.log('jQuery removed!')
      toggleStatus(2, jsSpan)
    }
  })
  jsButtons[3].addEventListener('click', function (e) {
    var p5Str = "<script src='lib/p5.min.js'></script>"
    if (ScrFlags[3] === 0) {
      scripts += p5Str
      ScrFlags[3] = 1
      console.log('p5.js added!')
      toggleStatus(3, jsSpan)
    } else {
      scripts = scripts.replace(p5Str, '')
      ScrFlags[3] = 0
      console.log('p5.js removed!')
      toggleStatus(3, jsSpan)
    }
  })
  jsButtons[4].addEventListener('click', function (e) {
    var js3Str = "<script src='lib/three.min.js'></script>"
    if (ScrFlags[4] === 0) {
      scripts += js3Str
      ScrFlags[4] = 1
      console.log('Three.js added!')
      toggleStatus(4, jsSpan)
    } else {
      scripts = scripts.replace(js3Str, '')
      ScrFlags[4] = 0
      console.log('Three.js removed!')
      toggleStatus(4, jsSpan)
    }
  })
};

function addStyle () {
  var cssMenu = document.getElementById('css-menu')
  var cssButtons = cssMenu.getElementsByTagName('a')
  let cssSpan = cssMenu.querySelectorAll('span')
  var StyFlags = [0, 0, 0]
  cssButtons[0].addEventListener('click', function (e) {
    var aniStr = "<link rel='stylesheet' type='text/css' href='lib/animate.css'>"
    if (StyFlags[0] === 0) {
      aniStr = "<link rel='stylesheet' type='text/css' href='lib/animate.css'>"
      styles += aniStr
      StyFlags[0] = 1
      console.log('Animate added!')
      toggleStatus(0, cssSpan)
    } else {
      styles = styles.replace(aniStr, '')
      StyFlags[0] = 0
      console.log('Animate removed!')
      toggleStatus(0, cssSpan)
    }
  })
  cssButtons[1].addEventListener('click', function (e) {
    var bootStr = "<link rel='stylesheet' type='text/css' href='lib/bootstrap.min.css'>"

    if (StyFlags[1] === 0) {
      styles += bootStr
      StyFlags[1] = 1
      console.log('Bootstrap added!')
      toggleStatus(1, cssSpan)
    } else {
      styles = styles.replace(bootStr, '')
      StyFlags[1] = 0
      console.log('Bootstrap removed!')
      toggleStatus(1, cssSpan)
    }
  })
  cssButtons[2].addEventListener('click', function (e) {
    var faStr = "<link rel='stylesheet' type='text/css' href='lib/font-awesome.min.css'>"
    if (StyFlags[2] === 0) {
      styles += faStr
      StyFlags[2] = 1
      console.log('Font Awesome added!')
      toggleStatus(2, cssSpan)
    } else {
      styles = styles.replace(faStr, '')
      StyFlags[2] = 0
      console.log('Font Awesome removed!')
      toggleStatus(2, cssSpan)
    }
  })
};
