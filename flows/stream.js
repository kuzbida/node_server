
var http = require('http'),
    fs = require('fs');

var server = new http.Server();

server.on('request', function (req, res) {
    console.log('request: ' + req.url);
    if(req.url == '/big.html'){
        var file = new fs.ReadStream('./big.html');
        sendFile(file, res);
    }
});

server.listen(3000);
function sendFile(file, res){
    console.log('pipe');
    file.pipe(res);

    file.on('error', function (err) {
        res.statusCode = 500;
        res.end('Server error');
        console.error(err);
    });

    file
        .on('open', function () {
            console.log('open');
        })
        .on('close', function () { //file reading close
            console.log('close')
        });

    //connection close
    res.on('close', function () {
        //if connection is close by some reasons
        //we need to destroy all listeners on file
        file.destroy();
    });
}

//This staff is embeded in node.js and called pipe()
/*function sendFile(file, res){
    file.on('readable', write);

    file.on('end', function () {
        console.log('end');
        res.end()
    });

    function write(){
        console.log('func write');
        var fileContent = file.read(); //read
        if(fileContent && !res.write(fileContent)){  //send
            file.removeListener('readable', write);
            console.log('remove listener');

            file.once('drain', function () { //wait
                console.log('drain');
                file.on('readable',write);
                write();
            })
        }
    }
}*/
