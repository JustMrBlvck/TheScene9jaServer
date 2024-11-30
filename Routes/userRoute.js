const express = require('express');
const { signUp, getAllUsers } = require('../Controller/userController');
const router = express.Router();

// Route to register a new user
router.post('/register', signUp);

// Route to fetch all users
router.get('/users', getAllUsers);

module.exports = router;
