const express = require('express');
const router = express.Router();

const { auth } = require('../middleware');
const { reviewController } = require('../controllers');
const { check } = require('express-validator');

// Routes
router.post('/', [
    auth,
    check('shopItemId').notEmpty().isInt(),
    check('text').notEmpty().isString(),
    check('grade').notEmpty().isIn([0, 1, 2, 3, 4, 5])
], reviewController.create);
router.delete('/:id', auth, reviewController.delete);
router.get('get-by-shop-item/:id', reviewController.getByShopItemId);

module.exports = router;