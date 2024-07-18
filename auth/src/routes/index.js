const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

const authController = require('../controllers/authController');

router.post('/signup', [
    // Validate 'email' and 'password' fields
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 5 })],authController.signUp);

router.post('/login',[
    // Validate 'email' and 'password' fields
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 5 }),
    
    ],authController.login);


module.exports = router;