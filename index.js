const express = require("express");
const dotenv = require("dotenv").config();
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const userRoute = require("./Routes/userRoute.js");
const connectDB = require('./db.js');

const port = process.env.PORT || 4040;

connectDB();
const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies
app.use(express.static(path.join(__dirname, "public"))); // Serve static files

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/UsersData')
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => {
        console.error("Error connecting to MongoDB", err);
        process.exit(1); // Exit process on DB connection failure
    });

// Routes
app.use(userRoute);


// Centralized Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ error: "Internal Server Error" });
});

// Start Server
app.listen(port, () => {
    console.log(`Server Running At port: ${port}`);
});
