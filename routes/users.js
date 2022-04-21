const express = require("express");
const router = express.Router();

const { auth } = require('../middleware');
const { userController } = require("../controllers");
const { check } = require("express-validator");

// Routes
router.get("/user-data", [auth], userController.getInfo);
router.put("/user-data", [
    auth,
    check('email').notEmpty().isEmail(),
    check('name').notEmpty().isString(),
], userController.update);
router.put("/address", [
    auth,
    check('x').notEmpty().isFloat(),
    check('y').notEmpty().isFloat(),
], userController.updateAddress);
router.get("/:id", userController.getById);

module.exports = router;
