const Book = require("../models/bookModel");

exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();

        // 200 OK
        res.status(200).json({
            status: "success",
            results: books.length,
            data: {
                books
            }
        });
    } catch (err) {
        console.log(err);
    }
};

exports.createBook = async (req, res) => {
    try {
        const newBook = await Book.create(req.body);

        res.status(200).json({
            status: "success",
            data: {
                book: newBook
            }
        });
    } catch (err) {
        console.log(err);
    }
};

exports.getBook = async (req, res) => {
    try {
        res.status(200).json({
            status: "success",
            data: {
                message: "Route in progress..."
            }
        });

    } catch (err) {
        console.log(err);
    }
};

exports.updateBook = async (req, res) => {
    try {
        res.status(200).json({
            status: "success",
            data: {
                message: "Route in progress..."
            }
        });

    } catch (err) {
        console.log(err);
    }
};

exports.deleteBook = async (req, res) => {
    try {
        res.status(200).json({
            status: "success",
            data: {
                message: "Route in progress..."
            }
        });

    } catch (err) {
        console.log(err);
    }
};