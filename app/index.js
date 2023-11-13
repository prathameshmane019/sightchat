const http = require("http");
const { Server } = require("socket.io");
const express = require("express");
const path = require("path");
const app = express();
const server = http.createServer(app);
const io = new Server(server);

const users = {};
io.on("connection", (socket) => {
    socket.on("new-user-joined", (name) => {
        users[socket.id] = name;
        console.log(name)
        socket.broadcast.emit('user-joined', name);
      });
      socket.on('send', message =>{
        socket.broadcast.emit('receive',{ message: message,name:users[socket.id]})
      });
});


server.listen(3001, () => console.log("server started"));
