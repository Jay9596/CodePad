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
		for (let i = 0; i < editor.length; i++) {
			editor[i].setOption('theme', 'base16-tomorrow-light');
		}
	} else {
		currentTheme = 'base16-ocean-dark';
		for (let i = 0; i < editor.length; i++) {
			editor[i].setOption('theme', 'base16-ocean-dark');
		}
	}
}