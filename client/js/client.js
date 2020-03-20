"use strict";
exports.__esModule = true;
var net_1 = require("net");
var response_1 = require("./response");
var console_1 = require("./console");
var request_1 = require("./request");
var main = function () {
    // Parsing command line arguments
    var args;
    try {
        args = console_1.parseCommandLineArguments();
    }
    catch (err) {
        console.error(err);
        return 0;
    }
    // Creating client socket, initializing TCP connection with host and sending request
    var client = net_1.createConnection(args.url.port ? Number(args.url.port) : 80, args.url.hostname, function () {
        var request = request_1.getRequest(args);
        client.write(request);
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
