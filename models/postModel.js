const db = require('../config/db');

// Create a new post
exports.createPost = async (userId, title, content, image) => {
  const sql = 'INSERT INTO posts (user_id, title, content, image) VALUES (?, ?, ?, ?)';
  const [result] = await db.query(sql, [userId, title, content, image]);
  return result;
};

// Get all posts
exports.getAllPosts = async () => {
  const sql = `
    SELECT posts.*, users.name 
    FROM posts 
    JOIN users ON posts.user_id = users.id 
    ORDER BY posts.id DESC`;
  const [rows] = await db.query(sql);
  return rows;
};

// Get single post by ID
exports.getPostById = async (postId) => {
  const sql = 'SELECT * FROM posts WHERE id = ?';
  const [rows] = await db.query(sql, [postId]);
  return rows[0];
};

// Update a post
exports.updatePost = async (postId, title, content, image) => {
  const sql = 'UPDATE posts SET title = ?, content = ?, image = ? WHERE id = ?';
  const [result] = await db.query(sql, [title, content, image, postId]);
  return result;
};

// Delete a post
exports.deletePost = async (postId) => {
  const sql = 'DELETE FROM posts WHERE id = ?';
  const [result] = await db.query(sql, [postId]);
  return result;
};
