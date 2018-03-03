module.exports = {
	windowClicks,
	initContextMenu
};
// Window Control [_][+][x] Buttons
function windowClicks() {
	document.getElementById('min-button').addEventListener('click', e => {
		remote.getCurrentWindow().minimize();
	});

	document.getElementById('max-button').addEventListener('click', e => {
		if (!remote.getCurrentWindow().isMaximized()) {
			remote.getCurrentWindow().maximize();
		} else {
			remote.getCurrentWindow().unmaximize();
		}
	});

	document.getElementById('close-button').addEventListener('click', e => {
		remote.getCurrentWindow().close();
	});
}

// Context menu init()
function initContextMenu() {
	menu = new Menu();
	menu.append(new MenuItem({
		label: 'Copy',
		role: 'copy'
		// Click: copy
	}));
	menu.append(new MenuItem({
		label: 'Cut',
		role: 'cut'
		// Click: cut
	}));
	menu.append(new MenuItem({
		label: 'Paste',
		role: 'paste'
		// Click: paste
	}));

	window.addEventListener('contextmenu', ev => {
		ev.preventDefault();
		menu.popup(remote.getCurrentWindow(), ev.x, ev.y);
	}, false);
}
