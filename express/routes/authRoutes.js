const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const { check, } = require('express-validator');
const validateMiddleware = require('../middleware/validateMiddleware');

const router = express.Router();

// Route for user registration
router.post(
    '/register',
    [
        // Validate username
        check('name')
            .isLength({ min: 3, max: 30 })
            .withMessage('name should be between 3 and 30 characters')
            .trim()
            .escape(),
        
        // Validate phone
        check('phone')
            .isLength({ min: 10, max: 10 })
            .withMessage('Phone number should be 10 digits long')
            .matches(/^\d{10}$/)
            .withMessage('Please provide a valid phone number')
            .trim()
            .escape(),

        // Validate email
        check('email')
            .isEmail()
            .withMessage('Please provide a valid email address')
            .normalizeEmail(),

        // Validate password
        check('password')
            .isLength({ min: 6 })
            .withMessage('Password must be at least 6 characters long')
            .matches(/\d/)
            .withMessage('Password must contain a number')
            .trim()
            .escape(),
    ],

    validateMiddleware,
    registerUser);

// Route for user login
router.post(
    '/login',
    [
        // Validate email
        check('email')
            .isEmail()
            .withMessage('Please provide a valid email address')
            .normalizeEmail(),

        // Validate password
        check('password')
            .isLength({ min: 6 })
            .withMessage('Password must be at least 6 characters long')
            .trim()
            .escape(),
    ],
    validateMiddleware,
    loginUser);

module.exports = router;
