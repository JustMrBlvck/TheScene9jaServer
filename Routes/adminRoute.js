const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const roleMiddleware = require('../middleware/role');
const adminController = require('../Controller/adminController');

// ensure user is authenticated and has admin priviledge
routes.use(authMiddleware);
routes.use(roleMiddleware);

router.get('/users', adminController.getAllUsers);
router.put('/users/:id', adminController.updateUser);
router.delete('//users/:id', adminController.deleteUser);

router.get('/posts', adminController.getAllPost);
router.delete('/posts/:id', adminController.deletePost);

module.exports = router;
