const blacklistTokenModel = require("../models/blacklistToken.model");
const userModel = require("../models/user-model");
const jwt = require("jsonwebtoken");
const captainModel = require("../models/captain.model");

module.exports.authUser = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  //   console.log("error")
  const isTokenBlacklist = await blacklistTokenModel.findOne({ token: token });

  if (isTokenBlacklist) {
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

module.exports.authCaptain = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  const isTokenBlacklist = await blacklistTokenModel.findOne({
    token: token,
  });
  // console.log(isTokenBlacklist);
  if (isTokenBlacklist) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  // console.log(token);
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    // console.log("hey");
    const decode = jwt.verify(token, process.env.JWT_KEY);
    // console.log(decode);
    // console.log(decode.id);
    const captain = await captainModel.findById(decode.id);
    // console.log(captain);

    req.captain = captain;

    return next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
