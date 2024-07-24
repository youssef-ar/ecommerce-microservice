const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

const authController = require('../controllers/authController');

router.post('/signup', [
    // Validate 'email' field 
    body('email')
    .isEmail()
    .normalizeEmail(),
     // Validate 'password' field 
    body('password')
    .isLength({ min: 8 }) 
    .withMessage('Password must be at least 8 characters long')
    .matches(/[a-z]/)  
    .withMessage('Password must contain at least one lowercase letter')
    .matches(/[A-Z]/)  
    .withMessage('Password must contain at least one uppercase letter')
    .matches(/\d/)  
    .withMessage('Password must contain at least one digit')
    .matches(/[@$!%*?&#]/)  
    .withMessage('Password must contain at least one special character')],authController.signUp);

router.post('/login',[
    // Validate 'email' field 
    body('email').isEmail().normalizeEmail(),
    // Validate 'password' field 
    body('password')
    .isLength({ min: 8 }) 
    .withMessage('Password must be at least 8 characters long')
    .matches(/[a-z]/)  
    .withMessage('Password must contain at least one lowercase letter')
    .matches(/[A-Z]/)  
    .withMessage('Password must contain at least one uppercase letter')
    .matches(/\d/)  
    .withMessage('Password must contain at least one digit')
    .matches(/[@$!%*?&#]/)  
    .withMessage('Password must contain at least one special character')
    ],authController.login);


module.exports = router;