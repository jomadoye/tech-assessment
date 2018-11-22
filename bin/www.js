// This will be our application entry. We'll setup our server here.
var http = require('http');
// var app = require('../dist/server/app');
var app = require('../server/app');
// import app from '../server/app'; // The express app we just created

const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);

const server = http.createServer(app);
server.listen(port);
