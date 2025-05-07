const db = require('../config/db');

// Create a new comment
const createComment = async (postId, userId, content) => {
  const sql = 'INSERT INTO comments (post_id, user_id, comment) VALUES (?, ?, ?)';
  const [result] = await db.query(sql, [postId, userId, content]);
  return result;
};

// Get all comments for a post
const getCommentsByPostId = async (postId) => {
  const sql = `
    SELECT comments.*, users.name AS user_name
    FROM comments
    JOIN users ON comments.user_id = users.id
    WHERE post_id = ?
    ORDER BY comments.created_at DESC
  `;
  const [results] = await db.query(sql, [postId]);
  return results;
};

module.exports = { createComment, getCommentsByPostId };
