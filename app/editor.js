const electron = require('electron')
const path = require('path')
const shell = electron.shell
const remote = electron.remote
const {dialog, Menu, MenuItem} = remote
const fs = require('fs')

//
const FILE = require('./filemenu')
const VIEW = require('./viewmenu')
const JSMenu = require('./scripts')
const CSSMenu = require('./styles')
const SHORTCUT = require('./shortcuts')
const WINDOW = require('./window')
//

var scripts = ''
var styles = ''
var currentEditor = ''
var editor = []
var menu, output, html, css, js, editorLabels
var saveFlag = false
var savePath = ''
var styFlags = [0, 0, 0]
var scrFlags = [0, 0, 0, 0, 0]

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

function removeFocus (editor) {
  for (var i = 0; i < editor.length; i++) {
    editor[i].classList.remove('editor-focus')
  }
}

/*
function cut() {
      var editor = getCurrenEditor()
      var text = editor.getSelection()
      clipboard.writeText(text)
      editor.replaceSelection('')
}
function copy() {
     var editor = getCurrenEditor()
      var text = editor.getSelection()
      clipboard.writeText(text)
}
function paste() {
      var editor = getCurrenEditor()
      editor.replaceSelection(clipboard.readText())
}
*/

// Main Functions for Electron
onload = function () {
  WINDOW.initContextMenu()
  WINDOW.helpInit()
  WINDOW.windowControls()

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

  FILE.fileMenu()
  // editMenu()
  VIEW.viewMenu()
  JSMenu.addScript()
  CSSMenu.addStyle()
  SHORTCUT.shortcuts()
  FILE.newFile()
  onresize()
}

onresize = function () {
  for (var i = 0; i < 3; i++) {
    editor[i].refresh()
  }
}

function paint () {
  output.srcdoc = '<html>' + '<head>' + getSty() + '<style>' + 'body{border:0;padding:0}' + css.getValue() + '</style>' + '</head>' + '<body>' + html.getValue() + getScr() + '<script>' + js.getValue() + '</script>' + '</body>' + '</html>'
}

function toggleStatus (i, span) {
  if (span[i].classList.contains('status-active')) {
    span[i].classList.remove('status-active')
  } else {
    span[i].classList.add('status-active')
  }
}

/*
function editMenu()
{
  document.getElementById('cut').addEventListener('click',cut)
  document.getElementById('copy').addEventListener('click',copy)
  document.getElementById('paste').addEventListener('click',paste)
}
*/
