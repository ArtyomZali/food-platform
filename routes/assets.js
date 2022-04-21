const express = require('express');
const router = express.Router();

const { auth } = require('../middleware');
const { assetController } = require('../controllers');
const { check } = require('express-validator');
const upload = require('../middleware/upload');

// Routes
router.get('/by-seller-profile/:id', assetController.getAssetsBySellerProfileId);
router.get('/seller-profile-asset/:id', assetController.getSellerProfileAsset);
router.post('/seller-profile-asset', [
    auth,
    upload.single('asset'),
], assetController.createSellerProfileAsset);
router.delete('/seller-profile-asset/:id', auth, assetController.deleteSellerProfileAsset);

router.get('/by-shop-item/:id', assetController.getAssetsByShopItemId);
router.get('/shop-item-asset/:id', assetController.getShopItemAsset);
router.post('/shop-item-asset/:id', [
    auth,
    upload.single('asset')
], assetController.createShopItemAsset);
router.delete('/shop-item-asset/:id', auth, assetController.deleteShopItemAsset);

router.post('/user-avatar', [
    auth,
    upload.single('avatar')
], assetController.setUserAvatar);
router.post('/seller-profile-avatar', [
    auth,
    upload.single('avatar')
], assetController.setSellerProfileAvatar);
router.post('/shop-item-avatar/:id', [
    auth,
    upload.single('avatar')
], assetController.setShopItemAvatar);


module.exports = router;