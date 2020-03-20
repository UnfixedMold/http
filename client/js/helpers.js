"use strict";
// Interfaces
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
// Functions
exports.getJsonHeaders = function (value) {
    var headers = value
        .split(',')
        .map(function (header) {
        var _a = header.split(':'), name = _a[0], value = _a[1];
        if (!(name && value)) {
            return null;
        }
        name = name.trim();
        value = value.trim();
        if (!(name.length && value.length)) {
            return null;
        }
        return { name: name, value: value };
    });
    return headers;
};
exports.getStringifiedHeaders = function (headers) {
    var getStrigifiedHeader = function (_a) {
        var name = _a.name, value = _a.value;
        return name + ": " + value + "\r\n";
    };
    return headers.reduce(function (req, h) {
        return req += getStrigifiedHeader(h);
    }, '');
};
exports.mergeJsonHeaders = function (first, second) {
    var mergedHeaders = __spreadArrays(first);
    second.forEach(function (header) {
        if (header) {
            var index = mergedHeaders.findIndex(function (h) { return h.name === header.name; });
            if (index >= 0) {
                mergedHeaders[index].value = header.value;
            }
            else {
                mergedHeaders.push(header);
            }
        }
    });
    return mergedHeaders;
};
exports.splitBufferBy = function (buffer, delimeter) {
    var index = buffer.indexOf(delimeter);
    var first = Buffer.alloc(index);
    buffer.copy(first, 0, 0, index);
    var second = Buffer.alloc(Buffer.byteLength(buffer) - (index + delimeter.length));
    buffer.copy(second, 0, index + delimeter.length);
    return [first, second];
};
// Enums 
var RequestType;
(function (RequestType) {
    RequestType["get"] = "GET";
    RequestType["post"] = "POST";
    RequestType["put"] = "PUT";
    RequestType["delete"] = "DELETE";
})(RequestType = exports.RequestType || (exports.RequestType = {}));
