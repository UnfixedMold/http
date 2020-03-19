import express from 'express'
import { books, Book } from "./database"

const app = express()
app.use(express.json());

// GET books

app.get('/books', (req, res) => res.json(books))
app.get('/books/:id', ({ params }, res) => {

    const book = books.find(book => book.id == params.id)

    if(!book) {
        res.status(404).end("Book not found")
    } else {
        res.json(book)
    }
})

// POST books

app.post('/books', ({ body }, res) => {

    const book = books.find(b => b.id == body.id)

    if(book) {
        res.status(409).end("Book is already added")
    }

    res.status(201).end("Book added")
})

// DELETE books

app.delete('/books', (req, res) => res.status(200).end("All books deleted"))
app.delete('/books/:id', ({ params }, res) => {

    const book = books.find(b => b.id == params.id)

    if(!book) {
        res.status(404).end("Book id not found")
    }

    res.status(200).end("Book deleted")
})


app.listen(3000)


