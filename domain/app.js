var domain = require('domain'),
    serverDomain = domain.create(),
    server;

serverDomain.on('error', function (err) {
    console.log('Domain catched error: ', err);
    if(server) {
        server.close();
    }

    setTimeout(function () {
        process.exit(1);
    }, 1000).unref();
});

serverDomain.run(function(){
    var http = require('http'),
        handler = require('./handler');

    server = new http.createServer(function (req, res) {
        var reqDomain = domain.create();
        reqDomain.add(req);
        reqDomain.add(res);

        reqDomain.on('error', function (err) {
            res.statusCode = 500;
            res.end("Sorry, " + err);

            serverDomain.emit('error', err);
        });

        reqDomain.run(function () {
            handler(req, res);
        })
    })
});