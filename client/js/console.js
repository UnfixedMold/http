"use strict";
exports.__esModule = true;
var RequestType;
(function (RequestType) {
    RequestType["get"] = "GET";
    RequestType["delete"] = "DELETE";
})(RequestType = exports.RequestType || (exports.RequestType = {}));
var requestTypes = [RequestType.get, RequestType["delete"]];
var verifyCommandLineArgument = function (name, value) {
    switch (name) {
        case '--request':
            return requestTypes.includes(value);
        default:
            return false;
    }
};
exports.parseCommandLineArguments = function () {
    if (process.argv.length < 3 || process.argv[2].startsWith('--')) {
        throw Error("Invalid command line arguments");
    }
    var cla = { url: process.argv[2], request: RequestType.get };
    var leftoverLen = process.argv.length - 3;
    for (var i = 0; i < Math.floor(leftoverLen / 2); i += 2) {
        var name_1 = process.argv[3 + i], value = process.argv[3 + i + 1];
        if (verifyCommandLineArgument(name_1, value)) {
            cla[name_1.slice(2)] = value;
        }
    }
    return cla;
};
