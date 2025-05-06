const db = require('../config/db');

const createUser = async (name, email, hashedPassword) => {
  const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
  try {
    const [result] = await db.execute(sql, [name, email, hashedPassword]);
    return result;
  } catch (err) {
    // Check for duplicate email error
    if (err.code === 'ER_DUP_ENTRY') {
      throw new Error('Email already exists');
    }
    throw new Error('Error creating user: ' + err.message);
  }
};

const getUserByEmail = async (email) => {
  const sql = 'SELECT * FROM users WHERE email = ?';
  try {
    const [rows] = await db.execute(sql, [email]);
    return rows;
  } catch (err) {
    throw new Error('Error fetching user: ' + err.message);
  }
};

module.exports = { createUser, getUserByEmail };


