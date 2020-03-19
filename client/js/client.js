"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var net_1 = __importDefault(require("net"));
var response_1 = require("./response");
var RequestType;
(function (RequestType) {
    RequestType["get"] = "GET";
    RequestType["delete"] = "DELETE";
})(RequestType || (RequestType = {}));
var requestTypes = [RequestType.get, RequestType["delete"]];
var main = function () {
    // Reading command line arguments
    if (process.argv.length < 2) {
        return 0;
    }
    // Parsing command line url
    var parsedUrl;
    try {
        parsedUrl = new URL(process.argv[2]);
    }
    catch (err) {
        console.log("Invalid url");
        return 0;
    }
    var type = RequestType.get;
    if (process.argv.length > 3 && requestTypes.includes(process.argv[3])) {
        type = process.argv[3];
    }
    // Creating socket & connecting to host & sending request
    var client = net_1["default"].createConnection(parsedUrl.port ? Number(parsedUrl.port) : 80, parsedUrl.hostname, function () {
        client.write(type + " " + parsedUrl.pathname + " HTTP/1.1\r\nHost: " + parsedUrl.hostname + "\r\n\r\n");
    });
    // Client events
    client.on('data', function (data) {
        var res = response_1.parseResponse(data);
        if (res.status == 200) {
            console.log(res.content);
        }
        client.end();
    });
    client.on('end', function () {
        // console.log('disconnected from server');
    });
    client.on('error', function (data) {
        console.log(data);
    });
};
main();
