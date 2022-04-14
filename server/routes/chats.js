const express = require('express');
const router = express.Router();

const { auth } = require('../middleware');
const { chatController } = require('../controllers');
const { oneOf, check } = require('express-validator');

// Routes
router.get('/', auth, chatController.all);
router.post('/', [
    auth,
    oneOf([
        check('sellerId').notEmpty().isInt(),
        check('customerId').notEmpty().isInt()
    ])
], chatController.create);
router.post('/send-message/:id', [
    auth,
    check('text').notEmpty().isString()
], chatController.sendMessage);
router.put('/read-messages/:id', auth, chatController.readMessages);
router.delete('/:id', auth, chatController.delete);
router.get('/:id', auth, chatController.getById);

module.exports = router;