var http = require('http'),
    fs = require('fs'),
    chat = require('./chat');

http.createServer(function (req, res) {
    switch (req.url) {
        case '/':
            sendFile("chat/index.html", res);
            break;

        case '/subscribe':
            chat.subscribe(req, res);
            break;

        case '/publish':
            var body = '';

            req
                .on('readable', function () {
                    var result = req.read();
                    if(result){
                        body += result;
                    }

                    if(body.length > 1e4){
                        res.statusCode = 413;
                        res.end("Fuck you");
                    }
                })
                .on('end', function () {
                    debugger;
                    try {
                        body = JSON.parse(body);
                    } catch (e) {
                        res.statusCode = 400;
                        res.end("Bad request");
                        return;
                    }

                    chat.publish(body.message);
                    res.end('ok');
                });

            break;

        default:
            res.statusCode = 404;
            res.end();
    }
}).listen(3000);

function sendFile(fileName, res) {
    console.log(fileName);
    var fileStream = new fs.ReadStream(fileName);
    fileStream.pipe(res);
}