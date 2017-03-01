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

//Functions for AddIns
function getScr ()  {
	return scripts;
}

function getSty()
{
	return styles;
}

function addBootCSS()
{
	const headFrame = $("#output").contents().find('head');
	console.log("clicked Boot CSS");
	var lk = document.createElement('link');
	lk.href = "lib/bootstrap.min.css";
	headFrame.append(lk);
}

//Main Functions for Electron
onload = function () {
	initContextMenu();

	newButton = document.getElementById("new");
	newButton.addEventListener("click", handleNewButton);

	editor[0] = CodeMirror(
		document.getElementById("html-editor"), {
			mode: {
				name: "htmlmixed",
			},
			lineNumbers: true,
			lineWrapping: true,
			autofocus: true,
			indentWithTabs: true,
			theme: "material"
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
			theme: "material"
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

			theme: "material"
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


// TODO: Limit execution to 1
// TODO: Append all Js libraries to inUse[] and refresh outputSource
function addScript() {
var JSMemu = document.getElementById("JSMenu");
var JSbuttons = JSMemu.getElementsByTagName('a');
JSbuttons[0].addEventListener("click", function(e){
	console.log("JS 0");
});
JSbuttons[1].addEventListener("click",function (e) {
	console.log("JS 1");
	var jQStr = "<script src='lib/jquery-3.1.1.min.js'></script>"
	scripts += jQStr;
});
JSbuttons[2].addEventListener("click", function(e){
	console.log("JS 2");
});
};

function addStyle() {

 var CSSMenu = document.getElementById("CSSMenu");
 var CSSbuttons = CSSMenu.getElementsByTagName('a');
 CSSbuttons[0].addEventListener("click", function(e){
	console.log("CSS 0");
	var bootStr = "<link href='lib/bootstrap.min.css'>"
	styles += bootStr;
	console.log("clicked Boot CSS");
});
CSSbuttons[1].addEventListener("click", function(e){
	console.log("CSS 1");
	
	var matStr = "<link href='lib/materialize.min.css'/>";
	styles += matStr;
	console.log("clicked Materialize CSS");
});
CSSbuttons[2].addEventListener("click", function(e){
	console.log("CSS 2");
});

};