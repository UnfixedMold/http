"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var database_1 = require("./database");
var app = express_1["default"]();
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
app.listen(3000);