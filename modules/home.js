var mongoose = require("mongoose");
var User = mongoose.model("Users");
var PdfData = mongoose.model("PdfDatas");



module.exports.createpdf = (userid, pdfdata) => {
    return new Promise(async (resolve, reject) => {

        try {
            const user = await User.findOne({ email: userid.email, isActive: "true" })
            if (user) {
                console.log(pdfdata)
                var data = await PdfData.create({ userId: user._id, pdfdata: pdfdata.pdfuri })
                if (data) {
                    return resolve({ message: "Success" })

                } else {
                    return resolve({ message: "ERROR" })
                }
            } else {
                return resolve({ message: "User Not Found", code: "Error" });
            }
        } catch (err) {
            console.log(err)
            return reject({ "message": err, code: "ErrorData" })
        }

    });
};

module.exports.getsavedpdf = (userid, pdfdata) => {
    return new Promise(async (resolve, reject) => {

        try {
            const user = await User.findOne({ email: userid.email, isActive: "true" })

            if (user) {
                var data = await PdfData.find({ userId: user._id })

                if (data) {
                    return resolve({ message: "Success", data: data })
                } else {
                    return resolve({ message: "ERROR" })
                }

            } else {
                return resolve({ message: "User Not Found", code: "Error" });
            }

        } catch (err) {
            console.log(err)
            return reject({ "message": err, code: "ErrorData" })
        }

    });
};