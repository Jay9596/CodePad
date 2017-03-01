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

// TODO: Use CodeMirror.change instead
document.addEventListener("keyup", function (e) {
	paint();
});


// TODO: Limit execution to 1
// TODO: Append all Js libraries to inUse[] and refresh outputSource
function addScript() {};

function addStyle() {};