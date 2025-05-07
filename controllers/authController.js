const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createUser, getUserByEmail, createUserbyAdmin, updateUserbyAdmin, getUserList} = require('../models/userModel');

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    await createUser(name, email, hashedPassword);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    // Show custom message in Postman
    res.status(400).json({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const users = await getUserByEmail(email);

    if (users.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = users[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};



const addUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await createUserbyAdmin(name, email, hashedPassword, role);
    res.status(201).json({ message: 'User created successfully', result });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, role } = req.body;
  try {
    const result = await updateUserbyAdmin(id, { name, email, role });
    res.status(200).json({ message: 'User updated successfully', result });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};



const userList = async (req, res) => {
  const { id } = req.params;
  const { name, email, role } = req.body;
  try {
    const result = await getUserList();
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { register, login, addUser, updateUser,userList };
