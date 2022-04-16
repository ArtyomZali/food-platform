const { sellerProfileService } = require('../services');
const BaseController = require('./base.controller');

class SellerProfileController extends BaseController {
    all = async (req, res, next) => {
        try {
            const data = await sellerProfileService.all();

            return res.json(data);
        } catch (error) {
            next(error);
        }
    };

    getCategories = async (req, res, next) => {
        try {
            const data = await sellerProfileService.getCategories();

            return res.json(data);
        } catch (error) {
            next(error);
        }
    };

    create = async (req, res, next) => {
        try {
            await this.respondWithValidationErrors(req, next);

            const data = await sellerProfileService.create(req.userId, req.body);

            return res.json(data);
        } catch (error) {
            console.log(error);
            next(error);
        }
    };

    update = async (req, res, next) => {
        try {
            await this.respondWithValidationErrors(req, next);

            await sellerProfileService.update(req.userId, req.body);
            return res.json({
                success: true,
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    };

    updateAddress = async (req, res, next) => {
        try {
            await this.respondWithValidationErrors(req, next);

            await sellerProfileService.updateAddress(req.userId, req.body);
            return res.json({
                success: true,
            });
        } catch (error) {
            next(error);
        }
    };

    delete = async (req, res, next) => {
        try {
            await sellerProfileService.delete(req.userId);
            return res.json({
                success: true,
            });
        } catch (error) {
            next(error);
        }
    };

    getUserSellerProfile = async (req, res, next) => {
        try {
            const data = await sellerProfileService.getUserSellerProfile(req.userId);
            return res.json(data);
        } catch (error) {
            console.log(error)
            next(error);
        }
    };

    getById = async (req, res, next) => {
        try {
            const data = await sellerProfileService.getById(req.params.id);
            return res.json(data);
        } catch (error) {
            next(error);
        }
    };
}

module.exports = new SellerProfileController();
