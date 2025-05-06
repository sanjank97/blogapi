const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const authenticateToken = require('../middleware/authMiddleware');
const upload = require('../middleware/multer'); // ✅ this already has storage configured

// Routes
router.post('/', authenticateToken, (req, res, next) => {
  upload.single('image')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      // Specific Multer errors (e.g., file too large, file type not allowed)
      return res.status(400).json({ message: err.message });
    } else if (err) {
      // Other errors (e.g., server issues, invalid input, etc.)
      return res.status(400).json({ message: err.message });
    }

    // If everything is good, proceed with creating the post
    postController.createPost(req, res, next);
  });
});

router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);

// Update Post (with file upload)
router.put('/:id', authenticateToken, (req, res, next) => {
  upload.single('image')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      // Multer-specific error handling (e.g., file too large)
      return res.status(400).json({ message: err.message });
    } else if (err) {
      // Other errors
      return res.status(400).json({ message: err.message });
    }

    // Proceed with updating the post
    postController.updatePost(req, res, next);
  });
});

router.delete('/:id', authenticateToken, postController.deletePost);

module.exports = router;

