const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Middleware to authenticate the user
exports.authenticate = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).send({ error: 'No token provided, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');
        if (!req.user) {
            return res.status(401).send({ error: 'User not found, authorization denied' });
        }
        next();
    } catch (error) {
        console.error(error);
        res.status(401).send({ error: 'Token is not valid' });
    }
};

// Middleware to authorize based on user roles
exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).send({ error: 'Access denied, insufficient permissions' });
        }
        next();
    };
};