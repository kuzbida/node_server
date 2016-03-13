var http = require('http'),
    fs = require('fs');


function handler(req, res) {
    if (req.url == '/') {
        fs.readFile('domain/index.html', function (err, content) {
            if (err) throw err;

            res.end(content);
        })
    } else {
        res.statusCode = 404;
        res.end("Not found");
    }
}

var server = new http.createServer(handler);
module.exports = server;