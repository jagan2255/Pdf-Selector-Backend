const express = require("express");
const router = express.Router();

router.use("/auth", require("./auth"));
router.use("/home", require("./home"));


module.exports = router;