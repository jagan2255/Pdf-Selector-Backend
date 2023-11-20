const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");


//API for Login
router.post("/login", authController.loginUser);

//API for Signup
router.post("/signup", authController.signupUser);





module.exports = router;