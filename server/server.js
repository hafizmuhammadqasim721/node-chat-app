const http = require('http');
const path = require('path');
const express = require('express');
const socketIO = require('socket.io');


const publicPath = path.join(__dirname, '/../public/');
const port = process.env.PORT || 3000;

const app = express();

app.use(express.static(publicPath));

var server = http.createServer(app);
var io = socketIO(server);

io.on('connection', (socket) => {
    console.log("New user is connected...");

    socket.emit('newMessage', {
        from: 'John',
        text: 'See you than',
        createdAt: 123123
    });

    socket.on('createMessage', (message) => {
        console.log('Created Message:', message);
    })

    socket.on('disconnect', () => {
        console.log("User disconnected");
    })
})


server.listen(port, () => {
    console.log(`SERVER IS UP ON PORT ${port}`);
})