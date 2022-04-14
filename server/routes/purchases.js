const express = require('express');
const router = express.Router();

const { auth } = require('../middleware');
const { purchaseController } = require('../controllers');
const { check } = require('express-validator');

// Routes
router.get('/my', auth, purchaseController.getUserPurchases);
router.get('/orders', auth, purchaseController.getUserOrders);
router.post('/', [
    auth,
    check('sellerId').notEmpty().isInt(),
    check('shopItems').notEmpty().isArray()
], purchaseController.create);
router.put('/update-status/:id', [
    auth,
    check('status').notEmpty().isIn(['created', 'done', 'canceled', 'process'])
], purchaseController.updateStatus);
router.get('/:id', auth, purchaseController.getById);

module.exports = router;