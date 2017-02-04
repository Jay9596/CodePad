var html,css,js;
function compile() {
    html = document.getElementById("html");
    css = document.getElementById("css");
    js = document.getElementById("js");
    //console.log(html+css+js);
    var code = document.getElementById("output");
    const Prehtml = "<!DOCTYPE html>\n<html>\n<head>\n<title>Try</title>\n</head><body>\n";
    const Posthtml = "\n</body>\n</html>";
    code.srcdoc = Prehtml + html.textContent + "<style>" + css.textContent + "</style>" + "<script>" + js.textContent + "</script>" + Posthtml;
}  

document.addEventListener("keyup",function(e){
    compile();
});

function clearAll()
{
    html = document.getElementById("html");
    css = document.getElementById("css");
    js = document.getElementById("js");
    html.textContent = css.textContent = js.textContent = "";
}