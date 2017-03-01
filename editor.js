var newButton;
var editor = [];
var menu;
var fileEntry;
var hasWriteAcces, output, html, css, js;

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

//Global variables
var scripts = "";
var styles = "";

//Functions for AddIns
function getScr ()  {
	return scripts;
}

function getSty()
{
	return styles;
}


function newFile() {
	fileEntry = null;
	hasWriteAccess = false;
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

//Handling jQuery
/*
* Check for button press and insert this jQStr into plugin div
*/
function jQButton()
{
  const jQStr = "<script src='./cm/lib/jquery-3.1.1.min.js'></script>";
  var head_style = $('#output').contents().find('head').find('style');
  $(jQStr).insertAfter(head_style);
  console.log("jQuery Added"); 
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

//Main Functions for Electron
onload = function () {
	initContextMenu();

	document.getElementById("min-button").addEventListener("click", function (e) {
		const window = remote.getCurrentWindow();
		window.minimize();
		console.log('Minimize Triggered!');
	});

	document.getElementById("max-button").addEventListener("click", function (e) {
		const window = remote.getCurrentWindow();
		if (!window.isMaximized()) {
			window.maximize();
		} else {
			window.unmaximize();
		}
		console.log('Maximize Triggered!');
		console.log(document.getElementById('close-button'));
	});

	document.getElementById("close-button").addEventListener("click", function (e) {
		const window = remote.getCurrentWindow();
		window.close();
	});

	document.getElementById("new").addEventListener("click", handleNewButton);

	editor[0] = CodeMirror(
		document.getElementById("html-editor"), {
			mode: {
				name: "htmlmixed",
			},
			lineNumbers: true,
			lineWrapping: true,
			autofocus: true,
			indentWithTabs: true,
			theme: "base16-ocean-dark"
		});

	editor[1] = CodeMirror(
		document.getElementById("css-editor"), {
			mode: {
				name: "css",
			},
			lineNumbers: true,
			lineWrapping: true,
			indentWithTabs: true,
			//Having issues with smartIndent. Therfore, turned off.
			smartIndent: false,
			theme: "base16-ocean-dark"
		});

	editor[2] = CodeMirror(
		document.getElementById("js-editor"), {
			mode: {
				name: "javascript",
				json: true
			},
			lineNumbers: true,
			lineWrapping: true,
			indentWithTabs: true,

			theme: "base16-ocean-dark"
		});

	output = document.getElementById("output");

	html = editor[0];
	css = editor[1];
	js = editor[2];

	addScript();
	addStyle();
	newFile();
	onresize();
};

onresize = function () {
	for (i = 0; i < 3; i++)
		editor[i].refresh();
}

function paint() {
	outputSource = '<html>' + '<head>' + '<style>' + css.getValue() + '</style>' + '</head>' + '<body>' + html.getValue() + '<script>' + js.getValue() + '</script>' + '</body>' + '</html>';
	console.log(outputSource);
	output.srcdoc = outputSource;
}

function paint(script,style) {
	outputSource = '<html>' + '<head>'+ style + '<style>' + css.getValue() + '</style>' + '</head>' + '<body>' + html.getValue() + script +  '<script>' + js.getValue() + '</script>' + '</body>' + '</html>';
	console.log(outputSource);
	output.srcdoc = outputSource;
}

// TODO: Use CodeMirror.change instead
document.addEventListener("keyup", function (e) {
	scr = getScr();
	sty = getSty();
	paint(scr,sty);
});


// TODO: Limit execution to 1 ❌
// DONE: All JS and CSS can be added at once ✔
// TODO: Append all Js libraries to inUse[] and refresh outputSource ❌
// TODO: Scripts added in order they are clicked no way to change order later on
function addScript() {
var JSMemu = document.getElementById("JSMenu");
var JSbuttons = JSMemu.getElementsByTagName('a');
JSbuttons[0].addEventListener("click", function(e){
	//console.log("JS 0");
	var jQStr = "<script src='lib/bootstrap.min.js'></script>"
	scripts += jQStr;
});
JSbuttons[1].addEventListener("click",function (e) {
	//console.log("JS 1");
	var jQStr = "<script src='lib/jquery-3.1.1.min.js'></script>"
	scripts += jQStr;
});
JSbuttons[2].addEventListener("click", function(e){
	//console.log("JS 2");
	var jQStr = "<script src='lib/three.min.js'></script>"
	scripts += jQStr;
});
};

function addStyle() {

 var CSSMenu = document.getElementById("CSSMenu");
 var CSSbuttons = CSSMenu.getElementsByTagName('a');
 CSSbuttons[0].addEventListener("click", function(e){
	//console.log("CSS 0");
	var bootStr = "<link href='lib/bootstrap.min.css'>"
	styles += bootStr;
});
CSSbuttons[1].addEventListener("click", function(e){
	//console.log("CSS 1");
	var matStr = "<link href='lib/materialize.min.css'/>";
	styles += matStr;
});
CSSbuttons[2].addEventListener("click", function(e){
	//console.log("CSS 2");
	var bootStr = "<link href='lib/animate.css'>"
	styles += bootStr;
});

};