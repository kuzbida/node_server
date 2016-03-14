var fs = require('fs'),
    redis = require('redis').createClient();

module.exports = function handler() {
    if (req.url == '/') {
        redis.get("data", process.domain.bind(function (err, data) {
            throw new Error("redis callback");
        }));

        /*fs.readFile('domain/index1.html', function (err, content) {
            if (err) throw err;

            res.end(content);
        })*/
    } else {
        res.statusCode = 404;
        res.end("Not found");
    }
};