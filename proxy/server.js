var http = require('http');
var httpProxy = require('http-proxy');

var proxy = httpProxy.createProxyServer({})

http.createServer(function(req, res) {
  res.setHeader('Access-Control-Allow-Method', 'POST, GET, OPTIONS, PUT, DELETE, HEAD');
  res.setHeader('Access-Control-Allow-Headers', 'accept, access-control-allow-origin, content-type, x-target');
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method == 'OPTIONS') {
    res.end();
  } else {
    proxy.web(req, res, {
      target: req.headers['x-target']
    });
  }
}).listen(10000);
