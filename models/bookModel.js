const { Schema, default: mongoose } = require("mongoose");

const bookSchema = new Schema({
    title: {
        type: String,
        required: [true, "A book must have a title"],
        unique: true,
        trim: true
    },
    author: {
        type: String,
        required: [true, "A book must have an author"],
        trim: true,
        maxlength: [30, "Author must have maximum 30 characters"]
    },
    genre: {
        type: String,
        required: [true, "A book must have a genre"],
        trim: true,
        maxlength: [20, "Genre must have maximum 30 characters"]
    },
    publishedDate: {
        type: Date,
        default: Date.now()
    },
    isbn: {
        type: String,
        required: [true, "A boom must have an ISBN"],
        trim: true,
        minlength: [13, "ISBN must have 13 characters"],
        maxlength: [13, "ISBN must have 13 characters"]
    },
    summary: {
        type: String,
        trim: true
    },
    availability: {
        type: Boolean,
        default: true
    },
    price: Number
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;