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
    publisher: {
        type: String,
        required: [true, "A book must have a publisher"],
        trim: true,
        maxlength: [30, "Publisher must have maximum 30 characters"]
    },
    genres: {
        type: [String],
        required: [true, "A book must have a genre"],
        trim: true,
        maxlength: [20, "Genre must have maximum 30 characters"]
    },
    pageCount: {
        type: Number,
        required: [true, "A book must have a page count"]
    },
    language: {
        type: String,
        required: [true, "A book must have a language"],
        maxlength: [20, "Language must have maximum 20 characters"]
    },
    publishedDate: {
        type: Date,
        default: Date.now()
    },
    isbn: {
        type: String,
        required: [true, "A book must have an ISBN"],
        match: [/^\d{13}$/, "ISBN must be a 13-digit number"]
    },
    summary: {
        type: String,
        trim: true
    },
    coverImage: String,
    rating: {
        type: Number,
        default: 4.0,
        min: [1, "Rating must be above 1.0"],
        max: [5, "Rating must be below 5.0"],
    },
    edition: {
        type: String,
        maxlength: [20, "Edition must have maximum 20 characters"]
    },
    format: {
        type: String,
        required: [true, "A book must have a format"],
        enum: {
            values: ["paperback", "hardcover", "ebook", "audiobook"],
            message: "Format must be: paperback, hardcover, ebook or audiobook"
        }
    },
    shelfLocation: {
        type: String,
        match: [/aisle [0-9]+, shelf [0-9]+/, 'Location must have format: "aisle #, shelf #"']
    },
    availability: {
        type: Boolean,
        default: true
    },
    stockCount: {
        type: Number,
        required: [true, "A book must have a stock count"],
        min: [0, "Stock count cannot be negative"]
    },
    price: {
        type: Number,
        min: [0, "Price cannot be negative"],
    }
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;