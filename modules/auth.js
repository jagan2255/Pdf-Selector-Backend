


module.exports.loginUser = (email,password) => {
    return new Promise(async (resolve, reject) => {

        try {

            return resolve({ message: "User Login Sucess", code: "Success" })


        } catch (err) {
            console.log(err)
            return reject({ "message": err, code: "ErrorData" })
        }

    });
};