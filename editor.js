var newButton;
var editor = [];
var menu;
var fileEntry;
var hasWriteAcces, output;

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

	newButton = document.getElementById("new");
	newButton.addEventListener("click", handleNewButton);

	editor[0] = CodeMirror(
		document.getElementById("html-editor"), {
			mode: {
				name: "htmlmixed",
			},
			lineNumbers: true,
			lineWrapping: true,
			theme: "night"
		});

	editor[1] = CodeMirror(
		document.getElementById("css-editor"), {
			mode: {
				name: "css",
			},
			lineNumbers: true,
			lineWrapping: true,
			theme: "night"
		});

	editor[2] = CodeMirror(
		document.getElementById("js-editor"), {
			mode: {
				name: "javascript",
				json: true
			},
			lineNumbers: true,
			lineWrapping: true,
			theme: "night"
		});

	output = document.getElementById("output");
	newFile();
	onresize();
};

onresize = function () {
	for (var i = 0; i < 3; i++)
		editor[i].refresh();
}


function compile() {
	var html = editor[0].getValue();
	var css = editor[1].getValue();
	var js = editor[2].getValue();

	outputSource = '<html>' + '<head>' + '<style>' + css + '</style>' + '<script>' + js + '</script>' + '</head>' + '<body>' + html + '</body>' + '</html>';
	console.log(outputSource);
	output.srcdoc = outputSource;
}

// TODO: Use CodeMirror.change instead
document.addEventListener("keyup", function (e) {
	compile();
});


// TODO: Limit execution to 1
// TODO: Append all Js libraries to inUse[] and refresh outputSource
function addScript() {};

function addStyle() {};