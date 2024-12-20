const http = require('http');
const url = require('url');
const fs = require('fs');
const hostname = 'ubiwan.epsevg.upc.edu'; //127.0.0.1
const port = 3016; //8000
http.createServer((req, res) => {
    let q = url.parse(req.url, true);
    let filename = "." + q.pathname;
    let ext = filename.split('.').pop();
    fs.readFile(filename, function(err, data) {
        if (err) {
            res.writeHead(404, {'Content-Type': 'text/html'});
            return res.end("404 Not Found");
        }
        let types = {
            'html' : 'text/html',
            'css'  : 'text/css',
            'js'   : 'application/javascript',
            'svg'  : 'image/svg+xml'
        };
        res.writeHead(200, {'Content-Type': types[ext]});
        res.write(data);
        return res.end();
    });
}).listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
