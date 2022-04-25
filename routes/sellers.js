const express = require('express');
const router = express.Router();

const { auth, optionalAuth } = require('../middleware');
const { sellerProfileController } = require('../controllers');
const { check } = require('express-validator');

// Routes
router.get('/', [optionalAuth], sellerProfileController.all);
router.get('/my', [auth], sellerProfileController.getUserSellerProfile);
router.get('/categories', sellerProfileController.getCategories);
router.get('/categories/extended', sellerProfileController.getExtendedCategories);
router.post('/', [
    auth,
    check('name').notEmpty().isString(),
    check('description').isString(),
    check('isPublished').notEmpty().isBoolean(),
    check('categories').exists().isArray()
], sellerProfileController.create);
router.put("/address", [
    auth
], sellerProfileController.updateAddress);
router.delete('/', auth, sellerProfileController.delete);
router.put('/:id', [
    auth,
    check('name').notEmpty().isString(),
    check('description').isString(),
    check('isPublished').notEmpty().isBoolean(),
    check('categories').exists().isArray()
], sellerProfileController.update);

module.exports = router;