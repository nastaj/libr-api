const express = require("express");

const bookController = require("../controllers/bookController");

// Create custom router
const router = express.Router();

// Define routes
router.route("/").get(bookController.getAllBooks).post(bookController.createBook);

module.exports = router;