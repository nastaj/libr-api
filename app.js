const express = require("express");
const morgan = require("morgan");

const bookRouter = require("./routes/bookRouter");

const app = express();

// MIDDLEWARES
// JSON parsing
app.use(express.json());

// Logging
app.use(morgan("dev"));

// ROUTES
app.use("/api/v1/books", bookRouter);

module.exports = app;