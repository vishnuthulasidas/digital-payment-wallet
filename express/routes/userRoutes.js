const express = require('express');
const { getUserProfile, updateUserProfile,searchUser } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Route to get user profile
router.get('/profile', authMiddleware, getUserProfile);

// Route to update user profile
router.put('/profile', authMiddleware, updateUserProfile);

//route to get the user name,prifile pic and id based in username
router.get('/search-user/:username', authMiddleware, searchUser);


module.exports = router;
