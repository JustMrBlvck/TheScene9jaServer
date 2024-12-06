const express = require('express');
const router = express.Router();
const { signUp, getAllUsers, updateUserProfile, viewUserProfile } = require('../Controller/userController');
const { createPost, getPosts, updatePost, deletePost } = require('../Controller/postController');
const { addComment, editComment, deleteComment } = require('../Controller/commentController');
const { authenticate, authorize } = require('../middleware/authMiddleware');

// Route for users
router.post('/register', signUp);
router.get('/users', authenticate, authorize('Admin'), getAllUsers);
router.put('/profile', authenticate, updateUserProfile);
router.get('/profile/:userId', authenticate, viewUserProfile);

// Route for blogs
router.post('/posts', authenticate, authorize('Author', 'Admin'), createPost);
router.get('/posts', getPosts);
router.put('/posts/:postId', authenticate, authorize('Author', 'Admin'), updatePost);
router.delete('/posts/:postId', authenticate, authorize('Author', 'Admin'), deletePost)


// comments routes
router.post('/posts/:postId/comments', authenticate, addComment);
router.put('/comments/commentId', authenticate, authorize('Admin'), editComment);
router.delete('/comments/commentId', authenticate, authorize('Admin'), deleteComment)


module.exports = router;
