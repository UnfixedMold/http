"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var splitBufferBy = function (buffer, delimeter) {
    var index = buffer.indexOf(delimeter);
    var first = Buffer.alloc(index);
    buffer.copy(first, 0, 0, index);
    var second = Buffer.alloc(Buffer.byteLength(buffer) - (index + delimeter.length));
    buffer.copy(second, 0, index + delimeter.length);
    return [first, second];
};
var parseStatusLine = function (buffer) {
    var _a = splitBufferBy(buffer, ' '), protocol = _a[0], statusMessage = _a[1];
    var status = splitBufferBy(statusMessage, ' ')[0];
    return { protocol: protocol.toString(), status: Number(status.toString()) };
};
var parseHeaders = function (buffer) {
    var delimeter = '\r\n';
    var headers = [];
    var tempBuffer = buffer;
    while (tempBuffer.includes(delimeter)) {
        var _a = splitBufferBy(tempBuffer, delimeter), header = _a[0], leftover = _a[1];
        headers.push(header);
        tempBuffer = leftover;
    }
    return headers.map(function (header) {
        var _a = splitBufferBy(header, ": "), name = _a[0], value = _a[1];
        return {
            name: name.toString(),
            value: value.toString()
        };
    });
};
var parseInfo = function (buffer) {
    var _a = splitBufferBy(buffer, '\r\n'), statusLine = _a[0], headerFields = _a[1];
    return __assign(__assign({}, parseStatusLine(statusLine)), { headers: parseHeaders(headerFields) });
};
exports.parseResponse = function (buffer) {
    var _a = splitBufferBy(buffer, '\r\n\r\n'), info = _a[0], content = _a[1];
    return __assign(__assign({}, parseInfo(info)), { content: content.toString() });
};
