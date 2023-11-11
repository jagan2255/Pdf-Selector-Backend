const jwt = require("jsonwebtoken");


module.exports.sign = async (user) => {
    const JWT_REFRESH_SECRET = process.env.REFRESH_SECRET
        ? process.env.REFRESH_SECRET
        : "secret";
    const JWT_ACCESS_SECRET = process.env.ACCESS_SECRET
        ? process.env.ACCESS_SECRET
        : "secret";

    return new Promise(async (resolve, reject) => {
        let refreshToken = await jwt.sign(
            {
                userId: user.id,
            },
            JWT_REFRESH_SECRET
        );
        let token = await jwt.sign(
            {
                userId: user.id,
            },
            JWT_ACCESS_SECRET,
            { expiresIn: 60 * 60 * 48 }
        );

        return resolve({ token, refreshToken });
    });
};

module.exports.decode = async (token) => {
    const JWT_SECRET = process.env.ACCESS_SECRET
        ? process.env.ACCESS_SECRET
        : "secret";
    return new Promise((resolve, reject) => {
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            console.log(err);
            if (err) return reject(err);

            return resolve(decoded);
        });
    });
};

module.exports.refreshDecode = async (token) => {
    const JWT_REFRESH_SECRET = process.env.REFRESH_SECRET
        ? process.env.REFRESH_SECRET
        : "secret";
    return new Promise((resolve, reject) => {
        jwt.verify(token, JWT_REFRESH_SECRET, (err, decoded) => {
            if (err) return reject(err);

            return resolve(decoded);
        });
    });
};

module.exports.refreshSign = async (user) => {
    const JWT_ACCESS_SECRET = process.env.ACCESS_SECRET
        ? process.env.ACCESS_SECRET
        : "secret";
    return new Promise(async (resolve, reject) => {
        let accessToken = await jwt.sign(
            {
                userId: user.userid,
            },
            JWT_ACCESS_SECRET,
            { expiresIn: 60 * 60 * 48 }
        );

        return resolve({ accessToken });
    });
};

