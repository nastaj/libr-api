/* eslint-disable no-undef */
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");

const app = require("./app");

// Config for environmental variables
dotenv.config({ path: "./config.env" });

// Connect to Mongo Database
// Hosted on Atlas
const DB = process.env.DATABASE.replace("<DB_PASSWORD>", process.env.DB_PASSWORD);
mongoose.connect(DB).then(() => {
    console.log("Successfully connected to database!");
});

// Start server
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});