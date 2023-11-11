const authModule = require("../modules/auth");
const createError = require("http-errors");




module.exports.loginUser = async (req, res, next) => {
    try {
        var email = req.body.email;
        var password = req.body.password;

        if (!email)
            return next(
                createError(502, {
                    message: "Email is Required",
                    code: "emailRequired",
                })
            );


        if (!password)
            return next(
                createError(502, {
                    message: "Password is Required",
                    code: "passwordRequired",
                })
            );


        let data = await authModule.loginUser(email, password);
        return res.status(200).json({ message: data });
    } catch (error) {
        res
            .status(422)
            .json({ errors: { body: [error.message], code: [error.code] } });
    }
};

