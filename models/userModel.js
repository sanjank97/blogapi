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


const createUserbyAdmin = async (name, email, hashedPassword, role = 'subscriber') => {
  const sql = 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)';
  try {
    const [result] = await db.execute(sql, [name, email, hashedPassword, role]);
    return result;
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      throw new Error('Email already exists');
    }
    throw new Error('Error creating user: ' + err.message);
  }
};


const updateUserbyAdmin = async (id, { name, email, role }) => {
  const sql = 'UPDATE users SET name = ?, email = ?, role = ? WHERE id = ?';
  try {
    const [result] = await db.execute(sql, [name, email, role, id]);
    return result;
  } catch (err) {
    throw new Error('Error updating user: ' + err.message);
  }
};

const getUserList = async () => {
  const sql = `SELECT id, name, email, role, created_at FROM users`;
  const [rows] = await db.query(sql);
  return rows;
};


module.exports = { createUser, getUserByEmail,createUserbyAdmin, updateUserbyAdmin, getUserList };


