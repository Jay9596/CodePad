var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);
let ids = [];

function myPush(socket, msg) {
  if (ids.indexOf(socket.id) === -1) {
    ids.push(socket.id);
    console.log(ids);
  }

  io.emit("css-change", msg);
}

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", function(socket) {
  console.log("a user connected");
  socket.on("css-change", msg => myPush(socket, msg));
});

http.listen(3000, function() {
  console.log("listening on *:3000");
});
