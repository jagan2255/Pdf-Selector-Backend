const {
    decode,
    refreshDecode,
  
  } = require("../utils/jwt");
  
  const mongoose = require('mongoose');
  const User = mongoose.model("User"); 
  
  module.exports.authByToken = async (req, res, next) => {
    //Check for Authorization header
    const authHeader = req.header("Authorization")
      ? req.header("Authorization").split(" ")
      : null;
  
    if (!authHeader) {
      return res.status(401).json({
        errors: {
          body: ["Authorization failed", "No Authorization header"],
          code: "failedAuthentication",
        },
      });
    }
  
    //Check if authorization type is token
    if (authHeader[0] !== "Token" && authHeader[0] !== "Bearer")
      return res.status(401).json({
        errors: {
          body: ["Authorization failed", "Token missing"],
          code: "failedAuthentication",
        },
      });
  
    //Check if token is valid
    const token = authHeader[1];
    try {
      let payload = await decode(token);
      let user = await users.findOne({ where: { id: payload.userId } });
      if (!user) throw new Error("No user found in token");
      req.user = user;
      return next();
    } catch (e) {
      return res.status(401).json({
        errors: {
          body: ["Authorization failed", e.message],
          code: "failedAuthentication",
        },
      });
    }
  };
  
  module.exports.authByRefreshToken = async (req, res, next) => {
    //Check for Authorization header
    const authHeader = req.body.refreshToken;
    if (!authHeader) {
      return res.status(401).json({
        errors: {
          body: ["Authorization failed", "No Authorization header"],
          code: ["failedAuthentication"],
        },
      });
    }
  
    //Check if token is valid
    const token = authHeader;
    try {
      let payload = await refreshDecode(token);
      let user = await users.findOne({ where: { id: payload.userId } });
      if (!user) throw new Error("No user found in token");
      req.user = user;
      return next();
    } catch (e) {
      return res.status(401).json({
        errors: {
          body: ["Authorization failed", e.message],
          code: "failedAuthentication",
        },
      });
    }
  };