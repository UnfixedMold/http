const express = require('express');
const { books } = require('./database');
const app = express();
// GET books
app.get('/books', (req, res) => res.json(books));
app.get('/books/:id', ({ params }, res) => {
    const book = books.find(book => book.id == params.id);
    if (!book) {
        res.status(404).end("Book not found");
    }
    else {
        res.json(book);
    }
});
// DELETE books
app.delete('/books', (req, res) => res.status(200).end("All books deleted"));
app.delete('/books/:id', ({ params }, res) => {
    if (params.id < 0 || params.id >= books.length) {
        res.status(404).end("Book id not found");
    }
    res.status(200).end("Book deleted");
});
app.listen(3000);
