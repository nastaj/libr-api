/* eslint-disable no-undef */
const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Book = require("../models/bookModel");

dotenv.config({ path: "./config.env" });

// CONNECT TO DATABASE
const DB = process.env.DATABASE.replace("<DB_PASSWORD>", process.env.DB_PASSWORD);
mongoose.connect(DB).then(() => {
    console.log("Successfully connected to database!");
});

// READ JSON FILE
const books = JSON.parse(fs.readFileSync(`${__dirname}/books_v1.json`));

// IMPORT DATA INTO DB
const importData = async () => {
    try {
        await Book.create(books);
        console.log("Data successfully loaded!");
        process.exit();
    } catch (err) {
        console.log(err);
    }
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
    try {
        await Book.deleteMany();
        console.log("Data successfully deleted!");
        process.exit();
    } catch (err) {
        console.log(err);
    }
};

if (process.argv[2] === "--import") {
    importData();
}
if (process.argv[2] === "--delete") {
    deleteData();
}
