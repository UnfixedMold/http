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
    // Creating client socket, initializing TCP connection with host and sending request
    var client = net_1.createConnection(parsedUrl.port ? Number(parsedUrl.port) : 80, parsedUrl.hostname, function () {
        client.write(cla.request + " " + parsedUrl.pathname + " HTTP/1.1\r\nHost: " + parsedUrl.hostname + "\r\n\r\n");
    });
    // Client events
    client.on('data', function (data) {
        var _a = response_1.parseResponse(data), statusCode = _a.statusCode, statusMessage = _a.statusMessage, content = _a.content;
        console.log("\nStatus code: " + statusCode + "\nStatus message: " + statusMessage + "\n");
        if (content) {
            console.log("Content:\n" + content + "\n");
        }
        client.end();
    });
    client.on('error', function (err) {
        console.error(err);
    });
};
main();
