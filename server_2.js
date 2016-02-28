var http = require('http'),
    url = require('url');

var server = new http.Server(function (req, res) {
    var urlParsed = url.parse(req.url, true);
    debugger;
    if(urlParsed.pathname === '/echo' && urlParsed.query.message){
        res.end(urlParsed.query.message)
    } else {
        res.statusCode = 404;
        res.end("Page not found");
    }
});

server.listen(1337, '127.0.0.1');
