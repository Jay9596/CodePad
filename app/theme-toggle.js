module.exports = {
	changeTheme
};

function changeTheme() {
	const option = document.getElementById('theme');
	const status = option.querySelectorAll('span');
	const editorBorder = document.getElementsByClassName('editor-item');
	toggleStatus(0, status);
	let currentTheme = editor[0].getOption('theme');

	if (currentTheme === 'base16-ocean-dark') {
		currentTheme = 'base16-tomorrow-light';
		editors.style.borderBottom = '2px solid #EAEAEA';
		for (let i = 0; i < editor.length; i++) {
			editor[i].setOption('theme', 'base16-tomorrow-light');
			editorBorder[i].style.borderRight = '2px solid #EAEAEA';
			editorLabels[i].style.color = '#646468';
			editorLabels[i].style.backgroundColor = '#F2F2F2';
		}
	} else {
		currentTheme = 'base16-ocean-dark';
		editors.style.borderBottom = '2px solid #121418';
		for (let i = 0; i < editor.length; i++) {
			editor[i].setOption('theme', 'base16-ocean-dark');
			editorBorder[i].style.borderRight = '2px solid #121418';
			editorLabels[i].style.color = '#EAEAEA';
			editorLabels[i].style.backgroundColor = '#232831';
		}
	}
}
