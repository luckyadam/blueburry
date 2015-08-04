var http = rquire('http');
var httpProxy = require('http-proxy');

var proxy = httpProxy.createProxyServer({})

http.createServer(function (req, res) {
    console.log(req.headers);
    res.headers['Access-Control-Allow-Origin'] = '*';
    res.headers['Access-Control-Allow-Headers'] = 'accept, access-control-allow-origin, content-type';
    res.headers['Access-Control-Allow-Method'] = 'POST, GET, OPTIONS, PUT, DELETE, HEAD';
    proxy.web(req, res, { target: req.headers.x-target });
}).listen(10000);

