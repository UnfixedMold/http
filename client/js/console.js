"use strict";
exports.__esModule = true;
var helpers_1 = require("./helpers");
var ArgumentType;
(function (ArgumentType) {
    ArgumentType["type"] = "--type";
    ArgumentType["headers"] = "--headers";
    ArgumentType["payload"] = "--payload";
})(ArgumentType = exports.ArgumentType || (exports.ArgumentType = {}));
var verifyCommandLineArgument = function (name) {
    return Object.values(ArgumentType).includes(name);
};
exports.parseCommandLineArguments = function () {
    var url = new URL(process.argv[2]);
    var cla = { url: url, type: helpers_1.RequestType.get, headers: [{ name: 'Host', value: url.hostname }] };
    var getCommandLineArgument = function (name, value) {
        switch (name) {
            case ArgumentType.type:
                if (Object.values(helpers_1.RequestType).includes(value)) {
                    return value;
                }
                return cla.type;
            case ArgumentType.headers:
                var initialHeaders = cla.headers;
                var userHeaders = helpers_1.getJsonHeaders(value);
                return helpers_1.mergeJsonHeaders(initialHeaders, userHeaders);
            default:
                return value;
        }
    };
    if (process.argv.length < 3 || process.argv[2].startsWith('--')) {
        throw Error("Invalid command line arguments");
    }
    var argIndex = 3;
    while ((argIndex + 2) <= process.argv.length) {
        var name_1 = process.argv[argIndex], value = process.argv[argIndex + 1];
        if (verifyCommandLineArgument(name_1)) {
            cla[name_1.slice(2)] = getCommandLineArgument(name_1, value);
        }
        argIndex += 2;
    }
    return cla;
};
