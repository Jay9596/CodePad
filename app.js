var html,css,js;
function compile() {
    html = document.getElementById("html");
    css = document.getElementById("css");
    js = document.getElementById("js");
    //console.log(html+css+js);
    var code = document.getElementById("output");
    const Prehtml = "<!DOCTYPE html>\n<html>\n<head>\n<title>Try</title>\n<style>";
    const PostStyle = "\n</style>\n</head>\n<body>";
    const Posthtml = "\n</body>\n</html>";
    code.srcdoc = Prehtml + css.textContent + PostStyle + html.textContent + "\n<script>" + js.textContent + "</script>" + Posthtml;
}  

document.addEventListener("keyup",function(e){
    compile();
});