var http = require('http'),
    fs = require('fs');

http.createServer(function (req, res) {
    var info;

    if(req.url == '/'){
        fs.readFile('index.html', function (err, info) {
            if(err){
                console.error(err);
                res.statusCode = 500;
                res.end("Oops something went wrong");
                return;
            } else {
                res.end(info);
            }
        })
    }
}).listen(3000);
