const io = require("socket.io-client");

module.exports = {
    getSocket,
    reconnect,
}

var WebSocketServer = {
    isConnected: false,
    socket: null,

    connect(ip) {
        if (this.socket) {
            this.socket.destroy();
            this.socket = null;
        }
        this.socket = io.connect(ip);

        this.socket.on('connect', () => {
            this.isConnected = true;
            console.log("Connected");

            socket.on("html-change", data => {
                // console.log(data);
                html.replaceRange(data.text, data.from, data.to);
            })

            socket.on("css-change", data => {
                // console.log(data);
                css.replaceRange(data.text, data.from, data.to);
            })

            socket.on("js-change", data => {
                // console.log(data);
                js.replaceRange(data.text, data.from, data.to);
            })
        });

        return this.socket;
    }
}

const DEFAULT = 'http://localhost:3000';

var socket = WebSocketServer.connect(DEFAULT);

function getSocket() {
    if ((socket == undefined) || (socket == null)) {
        socket = WebSocketServer.connect(DEFAULT)
    }

    return socket
}

function reconnect(ip) {
    socket = WebSocketServer.connect(ip);
}
