const express = require("express");

const authController = require("../controllers/auth.controller");
const getUserId = require("../middlewares/getUserId.middleware");

const router = express.Router();

router.post("/signup", authController.signup);

router.post("/login", authController.login);

router.get("/profile", getUserId, authController.getUser);

router.patch("/profile/edit", getUserId, authController.editUser);

router.post("/logout", authController.logout);

module.exports = router;
