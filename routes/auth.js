const express = require('express');
const router = express.Router();

const { auth } = require('../middleware');
const { authController } = require('../controllers');
const { check } = require('express-validator');

// Routes
router.post('/register', [
    check('email').notEmpty().isEmail(),
    check('password').notEmpty().isString(),
    check('name').notEmpty().isString()
], authController.register);
router.post('/login', [
    check('email').notEmpty().isEmail(),
    check('password').notEmpty().isString()
], authController.login);
router.post('/refresh-token', authController.refreshToken);
router.get('/check-auth', auth, authController.checkAuth);

module.exports = router;
