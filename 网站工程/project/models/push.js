io = require('socket.io').listen(app),
    parser = new require('xml2json'),
    fs = require('fs');

io.sockets.on('connection', function(socket) {
    console.log(__dirname);
    // watching the xml file
    fs.watchFile(__dirname + '/example.xml', function(curr, prev) {
        // 如果xml文件发生了改变，读取xml文件
        fs.readFile(__dirname + '/example.xml', function(err, data) {
            if (err) throw err;
            // xml转换为json
            var json = parser.toJson(data);
            // 发送新的数据到客户端
            socket.volatile.emit('notification', json);
        });
    });
});

