"use strict";
exports.__esModule = true;
var net_1 = require("net");
var response_1 = require("./response");
var console_1 = require("./console");
var main = function () {
    // Parsing command line arguments
    var cla;
    var parsedUrl;
    try {
        cla = console_1.parseCommandLineArguments();
        parsedUrl = new URL('http://' + cla.url);
    }
    catch (err) {
        console.error(err);
        return 0;
    }
    // Creating socket, initializing TCP connection and sending request
    var client = net_1.createConnection(parsedUrl.port ? Number(parsedUrl.port) : 80, parsedUrl.hostname, function () {
        client.write(cla.request + " " + parsedUrl.pathname + " HTTP/1.1\r\nHost: " + parsedUrl.hostname + "\r\n\r\n");
    });
    // Client events
    client.on('data', function (data) {
        var res = response_1.parseResponse(data);
        if (res.status >= 200 && res.status < 300) {
            console.log(res.content);
        }
        client.end();
    });
    client.on('error', function (err) {
        console.error(err);
    });
};
main();
