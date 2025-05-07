const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const authMiddleware = require('../middleware/authMiddleware');

// Add a comment to a post
router.post('/:postId', authMiddleware, commentController.addComment);

// Get all comments for a post
router.get('/:postId', commentController.getComments);

module.exports = router;
