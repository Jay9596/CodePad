var newButton;
var editor = [];
var menu;
var fileEntry;
var hasWriteAccess;

const {
  remote,
  clipboard
} = require('electron');

const {
  Menu,
  MenuItem,
  dialog
} = remote;
const fs = require("fs");

function handleDocumentChange(title, i) {
  var mode = "htmlmixed";
  var modeName = "html";
  if (title) {
    title = title.match(/[^/]+$/)[0];
    document.getElementById("title").innerHTML = title;
    document.title = title;
    if (title.match(/.json$/)) {
      mode = {
        name: "javascript",
        json: true
      };
      modeName = "JavaScript (JSON)";
    } else if (title.match(/.html$/)) {
      mode = "htmlmixed";
      modeName = "HTML";
    } else if (title.match(/.css$/)) {
      mode = "css";
      modeName = "CSS";
    }
  } else {
    document.getElementById("title").innerHTML = "[no document loaded]";
  }
  // editor[i].setOption("mode", mode);
  document.getElementById("mode").innerHTML = modeName;
}

function newFile() {
  fileEntry = null;
  hasWriteAccess = false;
  handleDocumentChange(null);
}

function setFile(theFileEntry, isWritable) {
  fileEntry = theFileEntry;
  hasWriteAccess = isWritable;
}

function handleNewButton(i) {
  if (false) {
    newFile();
    editor[i].setValue("");
  } else {
    window.open('file://' + __dirname + '/index.html');
  }
}

function initContextMenu(i) {
  menu = new Menu();
  menu.append(new MenuItem({
    label: 'Copy',
    click: function () {
      clipboard.writeText(editor[i].getSelection(), 'copy');
    }
  }));
  menu.append(new MenuItem({
    label: 'Cut',
    click: function () {
      clipboard.writeText(editor[i].getSelection(), 'copy');
      editor[i].replaceSelection('');
    }
  }));
  menu.append(new MenuItem({
    label: 'Paste',
    click: function () {
      editor[i].replaceSelection(clipboard.readText('copy'));
    }
  }));

  window.addEventListener('contextmenu', function (ev) {
    ev.preventDefault();
    menu.popup(remote.getCurrentWindow(), ev.x, ev.y);
  }, false);
}


onload = function () {
  initContextMenu();

  newButton = document.getElementById("new");
  newButton.addEventListener("click", handleNewButton);

  editor[0] = CodeMirror(
    document.getElementById("html-editor"), {
      mode: {
        name: "htmlmixed",
        json: true
      },
      lineNumbers: true,
      theme: "xq-dark"
    });

  editor[1] = CodeMirror(
    document.getElementById("css-editor"), {
      mode: {
        name: "css",
        json: true
      },
      lineNumbers: true,
      theme: "xq-dark"
    });

  editor[2] = CodeMirror(
    document.getElementById("js-editor"), {
      mode: {
        name: "javascript",
        json: true
      },
      lineNumbers: true,
      theme: "xq-dark"
    });

  newFile();
  onresize();
};

onresize = function () {
  // var container = document.getElementById('html-editor', 'css-editor', 'js-editor');
  // var containerWidth = container.offsetWidth;
  // var containerHeight = container.offsetHeight;

  // var scrollerElement = editor[0].getScrollerElement();
  // scrollerElement.style.width = containerWidth + 'px';
  // scrollerElement.style.height = containerHeight + 'px';

  for (var i = 0; i < 3; i++)
    editor[i].refresh();
}

function compile() {
  var html = editor[0].getValue();
  var css = editor[1].getValue();
  var js = editor[2].getValue();

  var code = document.getElementById("output");
  var outputSource = '<html>' + '<head>' + '<style>' + css + '</style>' + '<script>' + js + '</script>' + '</head>' + '<body>' + html + '</body>' + '</html>';
  console.log(outputSource);
  code.srcdoc = outputSource;
}

document.addEventListener("keyup", function (e) {
  compile();
});