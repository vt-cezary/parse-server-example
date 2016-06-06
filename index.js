var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var ParseDashboard = require('parse-dashboard');
var parseServerConfig = require('parse-server-azure-config');
var url = require('url');

var config = parseServerConfig(__dirname);

// Modify config as necessary before initializing parse server & dashboard

var app = express();
app.use('/public', express.static(__dirname + '/public'));

var api = new ParseServer(config.server);

app.use('/parse', api);
app.use('/parse-dashboard', ParseDashboard(config.dashboard, true));

//app.listen(process.env.PORT || url.parse(config.server.serverURL).port, function () {
//  console.log(`Parse Server running at ${config.server.serverURL}`);
//});

// Initialize a LiveQuery server instance, app is the express app of your Parse Server
var httpServer = require('http').createServer(app);
httpServer.listen(process.env.PORT || url.parse(config.server.serverURL).port);
var parseLiveQueryServer = ParseServer.createLiveQueryServer(httpServer);
