const express = require('express');
const router = express.Router();
const { register, login, addUser,updateUser, userList } = require('../controllers/authController');
const authenticateToken = require('../middleware/authMiddleware');
const {isAdmin}= require('../middleware/roleMiddleware');

// Admin-only route to add user
router.post('/admin/users', authenticateToken, isAdmin, addUser);
router.get('/admin/users', authenticateToken, isAdmin, userList);
// Admin-only route to update user
router.put('/admin/users/:id', authenticateToken, isAdmin, updateUser);


// User registration route
router.post('/register', register);

// User login route
router.post('/login', login);

module.exports = router;
