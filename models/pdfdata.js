const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PdfSchema = new Schema(
    {

        userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
        pdfdata: String,
        isActive: {
            type: Boolean,
            default: true
        }


    },
    { timestamps: true }
);

module.exports = mongoose.model('PdfDatas', PdfSchema);
