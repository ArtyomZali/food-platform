const express = require('express');
const router = express.Router();

const { auth } = require('../middleware');
const { shopItemController } = require('../controllers');
const { check } = require('express-validator');

// Routes
router.get('/', shopItemController.all);
router.get('/my', [auth], shopItemController.getUserShopItems);
router.get('/by-owner-id/:id', shopItemController.getByOwnerId);
router.get('/categories', shopItemController.getCategories);
router.post('/', [
    auth,
    check('name').notEmpty().isString(),
    check('description').exists().isString(),
    check('count').notEmpty().isInt(),
    check('isPublished').notEmpty().isBoolean(),
    check('category').exists(),
    check('unitName').notEmpty().isString(),
    check('isUnitInteger').notEmpty().isBoolean()
], shopItemController.create);
router.put('/:id', [
    auth,
    check('name').notEmpty().isString(),
    check('description').isString(),
    check('count').notEmpty().isInt(),
    check('isPublished').notEmpty().isBoolean(),
    check('category').exists(),
    check('unitName').notEmpty().isString(),
    check('isUnitInteger').notEmpty().isBoolean()
], shopItemController.update);
router.delete('/:id', auth, shopItemController.delete);
router.get('/:id', shopItemController.getById);

module.exports = router;