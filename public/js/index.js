var socket = io();

socket.on('connect', function() {
    console.log("Server is connected");

    socket.emit('createMessage', {
        to: 'andrew',
        text: 'Yup! It works for me.'
    });
});

socket.on('Disconnect', function() {
    console.log("Disconnected from server");
})


socket.on('newMessage', function(message) {
    console.log('New Message:', message);
})