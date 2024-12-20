const xmlrpc = require('xmlrpc');
const host = 'localhost', port = 9000;
// Creates an XML-RPC client. Passes the host information on where to make the XML-RPC calls.
const client = xmlrpc.createClient({ host, port, path: '/'});
let i = 1, v = [];
setInterval(function () {
v.push(i); i++;
// Sends a method call to the XML-RPC server
client.methodCall('sum', v, function (error, value) {
console.log("Method response for 'sum': " + value);
});
}, 1000);