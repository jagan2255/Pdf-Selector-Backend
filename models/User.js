const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {

    email: String,
    username: String,
    password: String,
    isActive: {
      type: Boolean,
      default: true
    }


  },
  { timestamps: true }
);

module.exports = mongoose.model('Users', UserSchema);
