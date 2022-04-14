const express = require('express');
const router = express.Router();

const { auth } = require('../middleware');
const { shopItemController } = require('../controllers');
const { check } = require('express-validator');

// Routes
router.get('/', shopItemController.all);
router.get('/by-owner-id/:id', shopItemController.getByOwnerId);
router.get('/categories', shopItemController.getCategories);
router.post('/', [
    auth,
    check('name').notEmpty().isString(),
    check('description').exists().isString(),
    check('count').notEmpty().isInt(),
    check('isPublished').notEmpty().isBoolean(),
    check('categoryId').exists(),
], shopItemController.create);
router.put('/:id', [
    auth,
    check('name').notEmpty().isString(),
    check('description').isString(),
    check('count').notEmpty().isInt(),
    check('isPublished').notEmpty().isBoolean(),
    check('categoryId').exists(),
], shopItemController.update);
router.post('/:id/unit', [
    auth,
    check('name').notEmpty().isString(),
    check('isInteger').notEmpty().isBoolean()
], shopItemController.createUnit);
router.put('/:id/unit/', [
    auth,
    check('name').notEmpty().isString(),
    check('isInteger').notEmpty().isBoolean()
], shopItemController.updateUnit);
router.delete('/:id', auth, shopItemController.delete);
router.get('/:id', auth, shopItemController.getById);

module.exports = router;