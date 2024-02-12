var express = require('express');


var router = express.Router();

var { body, validationResult } = require('express-validator');

const Book = require('../models/Books');

// Common routes

router.get('/', (req, res) => {
    res.redirect('/admin/books')
})

router.get('/books', async (req, res) => {
    try {
        const books = await Book.find();
        var locals = {
            books : books
        };
        res.render('admin', locals);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


// Api routes

router.post('/books/add_book', async (req, res) => {
    try {
        const { title, author, isbn } = req.body;
        const book = new Book({ title, author, isbn });
        await book.save();
        res.status(201).json(book);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.put('/books/:id', async (req, res) => {
    try {
        const { title, author, genre, _id } = req.body; // Include _id in the destructuring
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, { _id, title, author, genre }, { new: true });
        if (!updatedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json(updatedBook);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


router.delete('/books/:id', async (req, res) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        if (!deletedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json({ message: 'Book deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


module.exports = router;