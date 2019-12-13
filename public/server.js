var port = 3000;
var serverUrl = '127.0.0.1';

var connect = require('connect');
var serveStatic = require('serve-static');

// start server
connect().use(serveStatic(__dirname)).listen(port, serverUrl);
console.log(`✨ Starting web server at http://localhost:${port}`);