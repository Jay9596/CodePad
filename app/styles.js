module.exports = {
	addStyle,
	getCssLibs
};

function getCssLibs() {
	let cssHtml = '';
	for (let i = 0; i < cssLib.length; i++) {
		if (styFlags[i] === 1) {
			cssHtml += cssLib[i][1].replace('lib/', '');
		}
	}
	return cssHtml;
}

function addStyle() {
	const cssMenu = document.getElementById('css-menu');
	const cssButtons = cssMenu.getElementsByTagName('a');
	const cssSpan = cssMenu.querySelectorAll('span');
	cssButtons[0].addEventListener('click', e => {
		const anSty = cssLib[0][1];
		if (styFlags[0] === 0) {
			styles += anSty;
			styFlags[0] = 1;
			toggleStatus(0, cssSpan);
		} else {
			styles = styles.replace(anSty, '');
			styFlags[0] = 0;
			toggleStatus(0, cssSpan);
		}
	});
	cssButtons[1].addEventListener('click', e => {
		const boSty = cssLib[1][1];
		if (styFlags[1] === 0) {
			styles += boSty;
			styFlags[1] = 1;
			toggleStatus(1, cssSpan);
		} else {
			styles = styles.replace(boSty, '');
			styFlags[1] = 0;
			toggleStatus(1, cssSpan);
		}
	});
	cssButtons[2].addEventListener('click', e => {
		const faSty = cssLib[2][1];
		if (styFlags[2] === 0) {
			styles += faSty;
			styFlags[2] = 1;
			toggleStatus(2, cssSpan);
		} else {
			styles = styles.replace(faSty, '');
			styFlags[2] = 0;
			toggleStatus(2, cssSpan);
		}
	});
}
