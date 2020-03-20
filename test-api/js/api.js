"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var database_1 = require("./database");
var port = 3000;
var app = express_1["default"]();
app.use(express_1["default"].json());
// GET books
app.get('/books', function (req, res) { return res.json(database_1.books); });
app.get('/books/:id', function (_a, res) {
    var params = _a.params;
    var book = database_1.books.find(function (book) { return book.id == params.id; });
    if (!book) {
        res.status(404).end("Book not found");
    }
    else {
        res.json(book);
    }
});
// POST books
app.post('/books/:id', function (_a, res) {
    var params = _a.params, body = _a.body;
    if (!(params && params.id && body && body.name)) {
        res.status(400).end("Invalid request arguments");
    }
    var book = database_1.books.find(function (b) { return b.id == params.id; });
    if (book) {
        res.status(409).end("Book is already added");
    }
    res.status(201).end("Book added");
});
// PUT books
app.put('/books/:id', function (_a, res) {
    var params = _a.params, body = _a.body;
    if (!(params && params.id && body && body.name)) {
        res.status(400).end("Invalid request arguments");
    }
    var book = database_1.books.find(function (b) { return b.id == params.id; });
    if (!book) {
        res.status(400).end("Book not found");
    }
    res.status(200).end("Book edited");
});
// DELETE books
app["delete"]('/books', function (req, res) { return res.status(200).end("All books deleted"); });
app["delete"]('/books/:id', function (_a, res) {
    var params = _a.params;
    var book = database_1.books.find(function (b) { return b.id == params.id; });
    if (!book) {
        res.status(404).end("Book id not found");
    }
    res.status(200).end("Book deleted");
});
app.listen(port);
