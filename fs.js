var fs = require('fs');

fs.stat(__filename, function (err, stats) {
    if(err){
        console.error(err)
    } else {
        console.log(stats.isFile());
        console.log(stats);
    }
});

fs.writeFile("file.tmp", "data", function (err) {
    if (err) throw err;

    fs.rename("file.tmp", "new.tmp", function (err) {
        if (err) throw err;
    })
});