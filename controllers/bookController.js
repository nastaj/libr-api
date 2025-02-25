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
        const borrowedBook = await Book.findOneAndUpdate(
            // Find book by ID and make sure it's in the stock
            { _id: req.params.id, stockCount: { $gt: 0 } },
            [
                // Decrease stockCount by 1
                { $set: { stockCount: { $subtract: ["$stockCount", 1] } } },

                // Update availability
                { $set: { availability: { $gt: [{ $subtract: ["$stockCount", 1] }, 0] } } }
            ],
            // Return updated document
            { new: true }
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

exports.returnBook = async (req, res) => {
    try {
        const returnedBook = await Book.findByIdAndUpdate(
            req.params.id,
            {
                $inc: { stockCount: 1 },
                $set: { availability: true }
            },
            { new: true }
        );

        res.status(200).json({
            status: "success",
            data: {
                book: returnedBook
            }
        });

    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err
        });
    }
};