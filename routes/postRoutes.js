const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const authenticateToken = require('../middleware/authMiddleware');
const { uploadImage } = require('../middleware/multer'); // updated import

router.post('/', authenticateToken, uploadImage('image'), postController.createPost);
router.put('/:id', authenticateToken, uploadImage('image'), postController.updatePost);
router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);
router.delete('/:id', authenticateToken, postController.deletePost);

module.exports = router;
