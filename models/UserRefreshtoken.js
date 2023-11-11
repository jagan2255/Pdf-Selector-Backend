var mongoose = require("mongoose");

var UserRefreshTokenSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
        isActive: { type: Boolean, required: true, default: true },
        refreshToken: [
            {
                type: String,
            },
        ],
    },
    { timestamps: true }
);

module.exports = mongoose.model("UserRefreshToken", UserRefreshTokenSchema);