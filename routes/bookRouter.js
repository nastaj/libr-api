const express = require("express");

const bookController = require("../controllers/bookController");

// Create custom router
const router = express.Router();

// Define routes
router.route("/").get(bookController.getAllBooks).post(bookController.createBook);

router.route("/:id").get(bookController.getBook).patch(bookController.updateBook).delete(bookController.deleteBook);

router.route("/:id/borrow").patch(bookController.borrowBook);

module.exports = router;