const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    cover: { type: String, required: false },
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: [{ type: String }],
    published: { type: Date }
});

const Books = mongoose.model('Book', bookSchema, 'books');

module.exports = Books