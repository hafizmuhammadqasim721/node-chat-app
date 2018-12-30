var socket = io();

socket.on('connect', function() {
    console.log('Connected to server');

});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
    var formatedTime = moment(message.createdAt).format('h:mm a');

    var template = jQuery('#message-template').html();
    var html = Mustache.render(template, {
        from: message.from,
        createdAt: formatedTime,
        text: message.text
    });



    // var formatedTime = moment(message.createdAt).format('h:mm a');
    // var li = jQuery('<li></li>');
    // jQuery(li).text(`${message.from} ${formatedTime}: ${message.text}`);

    // jQuery('#messages').append(li);
    jQuery('#messages').append(html);


});

socket.on('newLocationMessage', function(message) {
    var formatedTime = moment(message.createdAt).format('h:mm a');

    var template = jQuery('#location-message-template').html();
    var html = Mustache.render(template, {
        from: message.from,
        createdAt: formatedTime,
        url: message.url
    })

    // var li = jQuery('<li></li');
    // var a = jQuery('<a target="_blank">My Current Location</a>');
    // li.text(`${message.from} ${formatedTime}:`);
    // a.attr('href', message.url);
    // li.append(a);

    jQuery('#messages').append(html);

});

jQuery('#message-form').on('submit', function(e) {
    e.preventDefault();

    var messageTextBox = jQuery('[name=message]');
    socket.emit('createMessage', {
        from: 'User',
        text: messageTextBox.val()
    }, function() {
        messageTextBox.val('');
    });

});

var locationButton = jQuery('#send-location');
locationButton.on('click', function() {
    if (!navigator.geolocation) {
        return alert('Unfortunately, Geolocation is not supported by you browsers');
    }

    locationButton.attr('disabled', 'disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition(function(position) {
        locationButton.removeAttr('disabled').text('Send location');

        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    }, function() {
        locationButton.removeAttr('disabled').text('Send location');
        alert('Unable to fetch location');

    });


});