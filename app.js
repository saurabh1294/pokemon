/*
        *File: app.js
        *Author: Saurabh Gattani
        *Last Modified: 31st May 2018
*/
var express = require('express');
var http = require('http');
//var bodyParser = require('body-parser');
var app = express();
var server = http.createServer(app);

app.use(express.static(__dirname));
//app.use(bodyParser());

app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get('/', function(req, res) 
{
    res.sendfile("./index.html");
});


module.exports = {
	start: function(port) {
		server.listen(port);
	}
}