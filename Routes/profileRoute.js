const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const profileController = require('../Controller/profileController');
const User = require('../Model/userModel');

router.put('/update', authMiddleware, profileController.updateProfile);
router.get('/:id', authMiddleware, profileController.updateProfile);

module.exports = router;

// controllers profileController.js
exports.updateProfile = (req, res) => {
    User.findByIdAndUpdate(req.user.id, req.body, { new: true })
        .then(user => res.send(user))
        .catch(err => res.status(500).send({ error: 'Server error' }));
};

exports.viewProfile = (req, res) => {
    User.findById(req.params.id)
        .then(user => res.send(user))
        .catch(err => res.status(500).send({ error: 'Server error' }));
}