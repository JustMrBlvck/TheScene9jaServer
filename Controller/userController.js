const User = require('../Model/userModel');
const bcrypt = require('bcrypt');
const jwt =  require('jsonwebtoken');

// Controller to handle user registration
exports.signUp = async (req, res) => {
    try {
        const { firstname, lastname, email, password } = req.body;

        // Validate required fields
        if (!firstname || !lastname || !email || !password) {
            return res.status(400).send({ error: "All fields are required" });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).send({ error: "Invalid email format" });
        }

        // Validate password strength
        if (password.length < 6) {
            return res.status(400).send({ error: "Password must be at least 6 characters long" });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ error: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and save the new user
        const newUser = new User({ firstname, lastname, email, password: hashedPassword });
        await newUser.save();

        // Avoid sending sensitive data back in the response
        const userResponse = { id: newUser._id, firstname: newUser.firstname, lastname: newUser.lastname, email: newUser.email };

        return res.status(201).send({ message: "User registered successfully", user: userResponse });

    } catch (error) {
        console.error(error); // Log error for debugging
        return res.status(500).send({ error: "Internal server error" });
    }
};

// Controller to get all users
exports.getAllUsers = async (req, res) => {
    try {
        // Exclude sensitive fields (like password) from the result
        const users = await User.find().select('-password');
        res.status(200).send(users);
    } catch (error) {
        console.error(error); // Log error for debugging
        res.status(500).send({ error: "Internal server error" });
    }
};

// Controller to update user profile
exports.updateUserProfile = async (req, res) => {
    try {
        const { firstname, lastname, bio, profilePicture } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            { firstname, lastname, bio, profilePicture },
            { new: true, runValidators: true }
        ).select('-password');
        res.status(200).send(updatedUser);
    } catch (error) {
        console.error(error); // Log error for debugging
        res.status(500).send({ error: "Internal server error" });
    }
};

// Controller to view user profile
exports.viewUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).select('-password');
        if (!user) {
            return res.status(404).send({ error: "User not found" });
        }
        res.status(200).send(user);
    } catch (error) {
        console.error(error); // Log error for debugging
        res.status(500).send({ error: "Internal server error" });
    }
};