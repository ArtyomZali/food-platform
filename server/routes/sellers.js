const express = require('express');
const router = express.Router();

const { auth } = require('../middleware');
const { sellerProfileController } = require('../controllers');
const { check } = require('express-validator');

// Routes
router.get('/', sellerProfileController.all);
router.get('/my', sellerProfileController.getUserSellerProfile);
router.get('/categories', sellerProfileController.getCategories);
router.post('/', [
    auth,
    check('name').notEmpty().isString(),
    check('description').isString(),
    check('address').isString(),
    check('isPublished').notEmpty().isBoolean(),
    check('categories').notEmpty().isArray()
], sellerProfileController.create);
router.put('/:id', [
    auth,
    check('name').notEmpty().isString(),
    check('description').isString(),
    check('address').isString(),
    check('isPublished').notEmpty().isBoolean(),
    check('categories').notEmpty().isArray()
], sellerProfileController.update);
router.delete('/', auth, sellerProfileController.delete);
router.get('/:id', sellerProfileController.getById);

module.exports = router;