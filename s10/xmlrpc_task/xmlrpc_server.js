const xmlrpc = require('xmlrpc');
const host = 'localhost', port = 9000;
// Creates an XML-RPC server to listen to XML-RPC method calls
const server = xmlrpc.createServer({host, port}, () => {
 console.log(`XML-RPC server listening on http://${host}:${port}`);
})
.on('NotFound', function(method, params) { // Handle methods not found
 console.log('Method ' + method + ' does not exist');
})
.on('sum', function (err, params, callback) {
 console.log("Method call params for 'sum': " + params);
 callback(err, params.reduce((acc, e) => acc += e, 0));
})
.on('system.listMethods', function (err, params, callback) {
 console.log("Method call params for 'system.listMethods': " + params);
 callback(err, ['sum']);
});