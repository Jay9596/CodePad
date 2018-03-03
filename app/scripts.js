module.exports = {
	addScript,
	getJsLibs
};

function getJsLibs() {
	let jsHtml = '';
	for (let i = 0; i < jsLib.length; i++) {
		if (scrFlags[i] === 1) {
			jsHtml += jsLib[i][1].replace('lib/', '');
		}
	}
	return jsHtml;
}

function addScript() {
	const jsMenu = document.getElementById('js-menu');
	const jsButtons = jsMenu.getElementsByTagName('a');
	const jsSpan = jsMenu.querySelectorAll('span');
	jsButtons[0].addEventListener('click', e => {
		const jqScr = jsLib[0][1];
		if (scrFlags[0] === 0) {
			scripts += jqScr;
			scrFlags[0] = 1;
			toggleStatus(0, jsSpan);
		} else if (scrFlags[2] === 0) {
			scripts = scripts.replace(jqScr, '');
			scrFlags[0] = 0;
			toggleStatus(0, jsSpan);
		}
	});
	jsButtons[1].addEventListener('click', e => {
		const aniScr = jsLib[1][1];
		if (scrFlags[1] === 0) {
			scripts += aniScr;
			scrFlags[1] = 1;
			toggleStatus(1, jsSpan);
		} else {
			scripts = scripts.replace(aniScr, '');
			scrFlags[1] = 0;
			toggleStatus(1, jsSpan);
		}
	});
	jsButtons[2].addEventListener('click', e => {
		const jqScr = jsLib[0][1];
		const boScr = jsLib[2][1];
		if (scrFlags[0] === 0) {
			toggleStatus(0, jsSpan);
			scripts += jqScr;
			scrFlags[0] = 1;
		}
		if (scrFlags[2] === 0) {
			scripts += boScr;
			scrFlags[2] = 1;
			toggleStatus(2, jsSpan);
		} else {
			scripts = scripts.replace(boScr, '');
			scrFlags[2] = 0;
			toggleStatus(2, jsSpan);
		}
	});
	jsButtons[3].addEventListener('click', e => {
		const dScr = jsLib[3][1];
		if (scrFlags[3] === 0) {
			scripts += dScr;
			scrFlags[3] = 1;
			toggleStatus(3, jsSpan);
		} else {
			scripts = scripts.replace(dScr, '');
			scrFlags[3] = 0;
			toggleStatus(3, jsSpan);
		}
	});
	jsButtons[4].addEventListener('click', e => {
		const momScr = jsLib[4][1];
		if (scrFlags[4] === 0) {
			scripts += momScr;
			scrFlags[4] = 1;
			toggleStatus(4, jsSpan);
		} else {
			scripts = scripts.replace(momScr, '');
			scrFlags[4] = 0;
			toggleStatus(4, jsSpan);
		}
	});
	jsButtons[5].addEventListener('click', e => {
		const p5Scr = jsLib[5][1];
		if (scrFlags[5] === 0) {
			scripts += p5Scr;
			scrFlags[5] = 1;
			toggleStatus(5, jsSpan);
		} else {
			scripts = scripts.replace(p5Scr, '');
			scrFlags[5] = 0;
			toggleStatus(5, jsSpan);
		}
	});
	jsButtons[6].addEventListener('click', e => {
		const thScr = jsLib[6][1];
		if (scrFlags[6] === 0) {
			scripts += thScr;
			scrFlags[6] = 1;
			toggleStatus(6, jsSpan);
		} else {
			scripts = scripts.replace(thScr, '');
			scrFlags[6] = 0;
			toggleStatus(6, jsSpan);
		}
	});
}
