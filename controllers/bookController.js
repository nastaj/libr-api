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
        // 404 NOT FOUND
        res.status(404).json({
            status: "fail",
            message: err
        });
    }
};

exports.createBook = async (req, res) => {
    try {
        const newBook = await Book.create(req.body);

        // 201 CREATED
        res.status(201).json({
            status: "success",
            data: {
                book: newBook
            }
        });
    } catch (err) {
        // 400 BAD REQUEST
        res.status(400).json({
            status: "fail",
            message: err
        });
    }
};

exports.getBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);

        res.status(200).json({
            status: "success",
            data: {
                book
            }
        });

    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err
        });
    }
};

exports.updateBook = async (req, res) => {
    try {
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
            runValidators: true
        });

        res.status(200).json({
            status: "success",
            data: {
                book: updatedBook
            }
        });

    } catch (err) {
        // 400 BAD REQUEST
        res.status(400).json({
            status: "fail",
            message: err
        });
    }
};

exports.deleteBook = async (req, res) => {
    try {
        await Book.findByIdAndDelete(req.params.id);

        // 204 NO CONTENT
        res.status(204).json({
            status: "success",
            data: null,
        });

    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err
        });
    }
};

exports.borrowBook = async (req, res) => {
    try {
        // Find book by ID
        const book = await Book.findById(req.params.id);

        // Update stock and availability
        const borrowedBook = await Book.findByIdAndUpdate(
            req.params.id,
            {
                $inc: { stockCount: -1 }, // Decrease stock count by 1
                $set: { availability: book.stockCount - 1 > 0 } // Set availability based on new stock count
            },
            { new: true } // Return the updated document
        );

        // Send response
        res.status(200).json({
            status: "success",
            data: {
                book: borrowedBook
            }
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err
        });
    }
};