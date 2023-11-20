const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home");
const {
    authByToken,

} = require("../middleware/auth");


//API for Saving PDF File to DB
router.post("/createpdf", authByToken, homeController.createpdf);

//API for Generating AWS Signed URL
router.get("/pdf/upload/:fileName", authByToken, homeController.pdfUpload)

//API for listing all the saved pdf for corresponding User
router.get("/getsavedpdf", authByToken, homeController.getsavedpdf);

//API for Viewing Saved File from S3
router.post("/fetchimage", authByToken, homeController.fetchImage)










module.exports = router;