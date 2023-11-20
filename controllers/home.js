const homeModule = require("../modules/home");
const createError = require("http-errors");
const { presignedUrl,fetchFile } = require("../utils/aws")


module.exports.createpdf = async (req, res, next) => {
    try {
        let user = req.user
        var pdfdata = req.body

        let data = await homeModule.createpdf(user, pdfdata);
        return res.status(200).json({ message: data });
    } catch (error) {
        res
            .status(422)
            .json({ errors: { body: [error.message], code: [error.code] } });
    }
};


module.exports.pdfUpload = async (req, res, next) => {
    try {
        let { url: uploadUrl, pathName } = await presignedUrl(req);
        if (uploadUrl) {
            return res.status(200).json({
                message: "Successfully Uploaded The File",
                code: "FileUploaded",
                uploadUrl,
                pathName,
            });
        } else {
            return res
                .status(422)
                .json({ message: "cannot upload file", code: "UploadFailed" });
        }
    } catch (error) {
        res
            .status(422)
            .json({ errors: { body: [error.message], code: [error.code] } });
    }
};


module.exports.getsavedpdf = async (req, res, next) => {
    try {
        let user = req.user

        let data = await homeModule.getsavedpdf(user);
        return res.status(200).json({ message: data });
    } catch (error) {
        res
            .status(422)
            .json({ errors: { body: [error.message], code: [error.code] } });
    }
};


module.exports.fetchImage = async (req, res, next) => {
    try {
      const userId = req.user;
      const path = req.body.pathname
      let data = await fetchFile(path, 5000);
      return res.json(data);
    } catch (error) {
      res
        .status(422)
        .json({ errors: { body: [error.message], code: [error.code] } });
    }
  };


