const bcrypt = require("bcrypt");
const saltRounds = 10;
var mongoose = require("mongoose");
var User = mongoose.model("Users");
var UserRefreshToken = mongoose.model("UserRefreshToken");
const { sign, refreshSign } = require("../utils/jwt")


module.exports.loginUser = (email, password) => {
    return new Promise(async (resolve, reject) => {

        try {
            const user = await User.findOne({ email: email, isActive: "true" })
            if (user) {

                //Using Bycrpt to match Password with Hashed Pasasword
                bcrypt.compare(password, user.password, async function (err, result) {
                    if (result) {
                        let { token, refreshToken } = await sign(user);

                        //Saving Refresh Token to Refresh Token Collection
                        await UserRefreshToken.findOneAndUpdate(
                            {
                                userId: user._id,
                            },
                            { $push: { refreshToken }, isActive: true },
                            { upsert: true }
                        )

                        return resolve({
                            user: {
                                token,
                                refreshToken,
                            },
                            message: "User Login Successfull",
                            code: "Success",
                        });



                    } else {
                        return resolve({ message: "Password is wrong", code: "Error" })
                    }
                })
            } else {
                return resolve({ message: "User Not Found", code: "Error" });
            }

        } catch (err) {
            console.log(err)
            return reject({ "message": err, code: "ErrorData" })
        }

    });
};

module.exports.signupUser = (email, password, userName) => {
    return new Promise(async (resolve, reject) => {

        try {

            const user = await User.findOne({ email: email, isActive: true })
            if (!user) {

                data = {
                    email: email,
                    userName: userName
                }

                //Generating Hashed Password Using Bycrpt
                bcrypt.hash(password, saltRounds, async function (err, hash) {
                    data.password = hash

                    //Saving User data to User Collection if user Not Found 
                    await User.create(data).then((res) => {
                        if (res) {

                            return resolve({
                                message: "User SignUp Successfully",
                                code: "Success",
                            });

                        } else {

                            return resolve({
                                message: "Error in Saving Data",
                                code: "Error"
                            })

                        }
                    }).catch((err) => {

                        return resolve({ message: err.message, code: "Error" })
                    })

                })
            } else {

                return resolve({ message: "User Already Exists", code: "Error" });
            }


        } catch (err) {
            console.log(err)
            return reject({ "message": err, code: "Error" })
        }

    });
};