const express = require("express");
const router = express.Router();

const { auth } = require('../middleware');
const { userController } = require("../controllers");
const { check } = require("express-validator");

// Routes
router.get("/:id", userController.getById);
router.get("/user-data", auth, userController.getInfo);
router.put("/user-data", [
    auth,
    check('email').notEmpty().isEmail(),
    check('password').notEmpty().isString(),
    check('firstName').notEmpty().isString(),
    check('lastName').notEmpty().isString(),
    check('address').isString()
], userController.update);

module.exports = router;
