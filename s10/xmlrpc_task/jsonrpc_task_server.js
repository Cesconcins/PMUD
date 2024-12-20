/*jshint esversion: 6 */
const jsonrpc = require('node-json-rpc');
const task_model = require('./task_model.js');

const host = '0.0.0.0'; 
const port = 8000;

// Creates a JSON-RPC server to listen to JSON-RPC method calls
const server = new jsonrpc.Server({
  host: host,
  port: port,
  path: '/',
  strict: true
});

server.addMethod('count', function (params, callback) {
  console.log("Method call params for 'count': " + JSON.stringify(params));
  params = params || [];
  let where = (typeof params[0] !== 'undefined') ?  params[0] : {};
  task_model.count(where)
    .then(total => {
      callback(null, [total]);
    })
    .catch(err => {
      callback({code: -32000, message: err.toString()});
    });
});

server.addMethod('getAll', function (params, callback) {
  console.log("Method call params for 'getAll': " + JSON.stringify(params));
  params = params || [];
  let where  = (typeof params[0] !== 'undefined') ? params[0] : {};
  let order  = (typeof params[1] !== 'undefined') ? params[1] : {};
  let offset = (typeof params[2] !== 'undefined') ? params[2] : 0;
  let limit  = (typeof params[3] !== 'undefined') ? params[3] : 0;
  task_model.getAll(where, order, offset, limit)
    .then(tasks => {
      callback(null, tasks);
    })
    .catch(err => {
      callback({code: -32000, message: err.toString()});
    });
});

server.addMethod('get', function (params, callback) {
  console.log("Method call params for 'get': " + JSON.stringify(params));
  params = params || [];
  task_model.get(params[0])
    .then(task => {
      callback(null, task);
    })
    .catch(err => {
      callback({code: -32000, message: err.toString()});
    });
});

server.addMethod('add', function (params, callback) {
  console.log("Method call params for 'add': " + JSON.stringify(params));
  params = params || [];
  let title = params[0];
  let done  = (typeof params[1] !== 'undefined') ? params[1] : false;
  task_model.add(title, done)
    .then(() => {callback(null, "Task added");})
    .catch(err => {
      callback({code: -32000, message: err.toString()});
    });
});

server.addMethod('update', function (params, callback) {
  console.log("Method call params for 'update': " + JSON.stringify(params));
  params = params || [];
  let id    = params[0];
  let title = params[1];
  let done  = params[2];
  task_model.update(id, title, done)
    .then(() => {callback(null, "Task updated");})
    .catch(err => {
      callback({code: -32000, message: err.toString()});
    });
});

server.addMethod('delete', function (params, callback) {
  console.log("Method call params for 'delete': " + JSON.stringify(params));
  params = params || [];
  let id = params[0];
  task_model.delete(id)
    .then(() => {callback(null, "Task deleted");})
    .catch(err => {
      callback({code: -32000, message: err.toString()});
    });
});

server.addMethod('reset', function (params, callback) {
  console.log("Method call params for 'reset': " + JSON.stringify(params));
  task_model.reset()
    .then(() => {callback(null, "Tasks reset");})
    .catch(err => {
      callback({code: -32000, message: err.toString()});
    });
});

// System methods
server.addMethod('system.listMethods', function (params, callback) {
  console.log("Method call params for 'system.listMethods': " + JSON.stringify(params));
  callback(null, ['count', 'getAll', 'get', 'add', 'update', 'delete', 'reset']);
});

server.addMethod('system.methodHelp', function (params, callback) {
  console.log("Method call params for 'system.methodHelp': " + JSON.stringify(params));
  params = params || [];
  let help = 'Unknown method';
  switch (params[0]) {
    case 'system.listMethods':
      help = "List of available methods";
      break;
    case 'system.methodHelp':
      help = "This method gives help about a specified method";
      break;
    case 'system.methodSignature':
      help = "This method provides the signature of a specified method";
      break;
    case 'count':
      help = "Returns an array with the number of elements that meet the conditions (where)";
      break;
    case 'getAll':
      help = "Returns an array of elements that meet the conditions. Parameters: where, order, offset, limit.";
      break;
    case 'get':
      help = "Returns the element identified by (id).";
      break;
    case 'add':
      help = "Adds a new element. Parameters: title, done.";
      break;
    case 'update':
      help = "Updates the element identified by (id). Parameters: id, title, done.";
      break;
    case 'delete':
      help = "Deletes the element identified by (id).";
      break;
    case 'reset':
      help = "Resets the element list to the initial values";
      break;
  }
  callback(null, help);
});

server.addMethod('system.methodSignature', function (params, callback) {
  console.log("Method call params for 'system.methodSignature': " + JSON.stringify(params));
  params = params || [];
  let sign = 'Unknown method';
  switch (params[0]) {
    case 'system.listMethods':
      sign = "None";
      break;
    case 'system.methodHelp':
      sign = "Name of the method (string)";
      break;
    case 'system.methodSignature':
      sign = "Name of the method (string)";
      break;
    case 'count':
      sign = `
        where: Object with conditions to filter elements.
        Example: {a:3,b:['<',5],c:['includes',"A"]}`;
      break;
    case 'getAll':
      sign = `
        where: Object
        order: Object
        offset: Number
        limit: Number`;
      break;
    case 'get':
      sign = "id: Element identification.";
      break;
    case 'add':
      sign = `
        title: String
        done: Boolean`;
      break;
    case 'update':
      sign = `
        id: Number
        title: String
        done: Boolean`;
      break;
    case 'delete':
      sign = "id: Element identification.";
      break;
    case 'reset':
      sign = "None";
      break;
  }
  callback(null, sign);
});

// Start the server
server.start(function (error) {
  if (error) throw error;
  else console.log(`JSON-RPC server listening on http://${host}:${port}`);
});
