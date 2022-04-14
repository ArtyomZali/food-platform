const express = require("express");
const router = express.Router();

router.use("/auth", require("./auth"));
router.use("/users", require("./users"));
router.use("/shop-items", require("./shopItems"));
router.use("/purchases", require("./purchases"));
router.use("/reviews", require("./reviews"));
router.use("/chats", require("./chats.js"));
router.use("/assets", require("./assets.js"));
router.use("/seller-profiles", require("./sellers.js"));

module.exports = router;
