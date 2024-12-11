const express = require("express");
const dotenv = require("dotenv");
const cors = require('cors');
const path = require('path');
const userRoute = require("./Routes/userRoute");
const connectDB = require('./db');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies
app.use(express.static(path.join(__dirname, "public"))); // Serve static files

// Routes
app.use('/api', userRoute);

// Centralized Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ error: "Internal Server Error" });
});

// Start Server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server Running At port: ${port}`);
});