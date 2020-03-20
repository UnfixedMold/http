"use strict";
exports.__esModule = true;
var helpers_1 = require("./helpers");
var version = "HTTP/1.1";
exports.getRequest = function (_a) {
    var type = _a.type, url = _a.url, headers = _a.headers, payload = _a.payload;
    var getTemporaryHeaders = function () {
        var headers = [];
        if (payload) {
            headers.push({
                name: "Content-Length",
                value: "" + payload.length
            });
        }
        return headers;
    };
    // Add status line
    var request = type + " " + url.pathname + " " + version + "\r\n";
    // Add headers
    var allHeaders = helpers_1.mergeJsonHeaders(getTemporaryHeaders(), headers);
    request += helpers_1.getStringifiedHeaders(allHeaders);
    // Add an empty line
    request += '\r\n';
    // Add payload
    if (payload) {
        request += payload;
    }
    return request;
};
