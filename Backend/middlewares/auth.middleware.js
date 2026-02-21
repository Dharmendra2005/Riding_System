const userModel = require("../models/user-model");
const jwt = require("jsonwebtoken");
module.exports.authUser = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization.split(" ")[1];

  //   console.log("error")
  const isTokenBlacklist = await userModel.findOne({token: token});

  if(isTokenBlacklist){
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_KEY);
    const user = await userModel.findById(decode._id);

    req.user = user;

    return next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
