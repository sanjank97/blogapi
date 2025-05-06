const postModel = require('../models/postModel');

// Create a post
exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const image = req.file ? req.file.filename : null;
    const userId = req.user.id; // from authMiddleware

    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }

    const result = await postModel.createPost(userId, title, content, image);
    res.status(201).json({ message: 'Post created', postId: result.insertId });
  } catch (err) {
    res.status(500).json({ message: 'DB error', error: err.message });
  }
};

// Get all posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await postModel.getAllPosts();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: 'DB error', error: err.message });
  }
};

// Get post by ID
exports.getPostById = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await postModel.getPostById(postId);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: 'DB error', error: err.message });
  }
};

// Update post
exports.updatePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const { title, content } = req.body;
    const image = req.file ? req.file.filename : null;

    await postModel.updatePost(postId, title, content, image);
    res.json({ message: 'Post updated' });
  } catch (err) {
    res.status(500).json({ message: 'DB error', error: err.message });
  }
};

// Delete post
exports.deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    await postModel.deletePost(postId);
    res.json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ message: 'DB error', error: err.message });
  }
};
