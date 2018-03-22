var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);

let sockets = [];


// app.get("/", function (req, res) {
//   res.sendFile(__dirname + "/index.html");
// });

io.on("connection", function (socket) {
  console.log("user connected");
  sockets.push(socket)

  socket.on("html_change", (op) => {
    console.log(op);
    if (op.origin == '+input' || op.origin == 'paste' || op.origin == '+delete') {
      sockets.forEach(function (sock) {
        if (sock != socket)
          sock.emit('html-change', op);
      });
    }
  });

  socket.on("css_change", (op) => {
    console.log(op);
    if (op.origin == '+input' || op.origin == 'paste' || op.origin == '+delete') {
      sockets.forEach(function (sock) {
        if (sock != socket)
          sock.emit('css-change', op);
      });
    }
  });

  socket.on("js_change", (op) => {
    console.log(op);
    if (op.origin == '+input' || op.origin == 'paste' || op.origin == '+delete') {
      sockets.forEach(function (sock) {
        if (sock != socket)
          sock.emit('js-change', op);
      });
    }
  });

});

http.listen(3000, function () {
  console.log("listening on *:3000");
});
