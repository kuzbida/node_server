var domain = require('domain'),
    serverDomain = domain.create(),
    server = require('./server');

serverDomain.on('error', function (err) {
    console.log('Domain catched error: ', err);
});

serverDomain.run(function(){
    server.listen(3000)
});