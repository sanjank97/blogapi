const commentModel = require('../models/commentModel');

const addComment = async (req, res) => {
  const { postId } = req.params;
  const { content } = req.body;
  const userId = req.user.id; // from JWT authMiddleware

  try {
    await commentModel.createComment(postId, userId, content);
    res.status(201).json({ message: 'Comment added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding comment', error });
  }
};

const getComments = async (req, res) => {
  const { postId } = req.params;

  try {
    const comments = await commentModel.getCommentsByPostId(postId);
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching comments', error });
  }
};

module.exports = { addComment, getComments };
