var html = document.getElementById("html-code");
var css = document.getElementById("css-code");
var js = document.getElementById("js-code");

function compile() {
    var code = document.getElementById("output");
    const Prehtml = "<!DOCTYPE html>\n<html>\n<head>\n<title>Try</title>\n<style>";
    const PostStyle = "\n</style>\n</head>\n<body>";
    const Posthtml = "\n</body>\n</html>";
    code.srcdoc = Prehtml + css.textContent + PostStyle + html.textContent + "\n<script>" + js.textContent + "</script>" + Posthtml;
}

document.addEventListener("keyup", function (e) {
    compile();
});