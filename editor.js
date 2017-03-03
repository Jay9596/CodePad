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
const getScr = () => scripts;

const getSty = () => styles;


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

//Context menu init()
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

	document.getElementById("close-window").addEventListener("click", function (e) {
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
			scrollbarStyle: "overlay",
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
			scrollbarStyle: "overlay",
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
			scrollbarStyle: "overlay",
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

function paint(script, style) {
	outputSource = '<html>' + '<head>' + style + '<style>' + css.getValue() + '</style>' + '</head>' + '<body>' + html.getValue() + script + '<script>' + js.getValue() + '</script>' + '</body>' + '</html>';
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


// TODO: Limit execution to 1 ✔
// DONE: All JS and CSS can be added at once ✔
// TODO: Append all Js libraries to inUse[] and refresh outputSource ❌
// DONE: Scripts added once wouldn't be added again
function addScript() {
	var JSMemu = document.getElementById("JSMenu");
	var JSbuttons = JSMemu.getElementsByTagName('a');
	var ScrFlags = [0,0,0];
	JSbuttons[0].addEventListener("click", function (e) {
		console.log("JS 0");
		if(ScrFlags[1] === 0)
		{
			var jQStr = "<script src='lib/jquery-3.1.1.min.js'>"
			scripts += jQStr;
			ScrFlags[1] = 1;
			console.log("jQuery added!");
		}
		if(ScrFlags[0] === 0)
		{
			var bootjsStr = "</script><script src='lib/bootstrap.min.js'></script>"
			scripts += bootjsStr;
			ScrFlags[0] = 1;
			console.log("Bootstrap added!");
		}
	});
	JSbuttons[1].addEventListener("click", function (e) {
		console.log("JS 1");
		if(ScrFlags[1] === 0)
		{
			var jQStr = "<script src='lib/jquery-3.1.1.min.js'></script>"
			scripts += jQStr;
			ScrFlags[1] = 1;
			console.log("jQuery added!");
		}
	});
	JSbuttons[2].addEventListener("click", function (e) {
		console.log("JS 2");
		if(ScrFlags[2] === 0)
		{
			var js3Str = "<script src='lib/three.min.js'></script>"
			scripts += js3Str;
			ScrFlags[2] = 1;
			console.log("Three.js added!");
		}
	});
};

function addStyle() {
	var CSSMenu = document.getElementById("CSSMenu");
	var CSSbuttons = CSSMenu.getElementsByTagName('a');
	var StyFlags = [0,0,0,0];
	CSSbuttons[0].addEventListener("click", function (e) {
		console.log("CSS 0");
		if(StyFlags[0] === 0)
		{
			var aniStr = "<link rel='stylesheet' type='text/css' href='lib/animate.css'>"
			styles += aniStr;
			StyFlags[0] = 1;
			console.log("Animate added!");
		}	
	});
	CSSbuttons[1].addEventListener("click", function (e) {
		console.log("CSS 1");
		if(StyFlags[1] === 1)
		{
			var bootStr = "<link rel='stylesheet' type='text/css' href='lib/bootstrap.min.css'>";
			styles += bootStr;
			StyFlags[1] = 1;
			console.log("Bootstrap added!");
		}
	});
	CSSbuttons[2].addEventListener("click", function (e) {
		console.log("CSS 2");
		if(StyFlags[2] === 0)
		{
			var faStr = "<link rel='stylesheet' type='text/css' href='lib/font-awesome.min.css'>"
			styles += faStr;
			StyFlags[2] = 1;
			console.log("Font Awesome added!");
		}
	});
	CSSbuttons[3].addEventListener("click", function (e) {
		console.log("CSS 3");
		if(StyFlags[3] === 0)
		{
			var matStr = "<link href='lib/materialize.min.css'>"
			styles += matStr;
			StyFlags[3] = 1;
			console.log("Materialize added!");
		}	
	});
};