var clients = [];

exports.subscribe = function (req, res) {
    console.log('subscribe');

    clients.push(res);

    //we need to remove closed connections
    res.on('close', function () {
        clients.splice(clients.indexOf(res), 1);
    });
};

exports.publish = function (message) {
    console.log('publish: '+message);

    clients.forEach(function (res) {
        res.end(message)
    });

    clients = [];
};