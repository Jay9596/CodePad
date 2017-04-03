module.exports = {
    changeTheme
}

function changeTheme() {
    var option = document.getElementById('theme')
    var status = option.querySelectorAll('span')
    toggleStatus(0,status)
    var theme = editor[0].getOption('theme')
    if( theme != 'myBlueTheme'){
        theme = 'myBlueTheme'
    }
    else
    {
        theme = 'base16-ocean-dark'
    }
    for(var i = 0 ; i< editor.length;i++)
        {
            editor[i].setOption('theme',theme)
        }
    //console.log(editor[0].options.theme)
}