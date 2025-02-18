const express = require("express");
const dotenv = require("dotenv");
const app = express();

// Config for environmental variables
const config = dotenv.config({ path: "./config.env" });

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});