const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config();

const port = process.env.PORT || 4000;
const generalRoute = require("./routes/generalRoute.js");

const app = express();

// Static Files Middleware
app.use(express.static("public"));

// Body Parser Middleware (Built into Express)
app.use(express.urlencoded({ extended: false }));

// Use General Route
app.use("/", generalRoute);

// Start Server
app.listen(port, () => {
    console.log("Server Running At port: " + port);
});
