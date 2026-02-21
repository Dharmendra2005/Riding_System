const userModel = require("../models/user-model");
const userService = require("../services/user.service");
const blackListToken = require("../models/blacklistToken.model")

//to check valid input
const {validationResult} = require("express-validator");

module.exports.registerUser = async (req, res, next) => {
    //if i found any error 
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({error:errors.array()});
    }
    const {fullName, email, password} = req.body;

    const hashPassword = await userModel.hashPassword(password);

    const user = await userService.createUser({
        firstName : fullName.firstName,
        lastName : fullName.lastName,
        email,
        password: hashPassword,
    });
    const token = user.generateAuthToken();
    
    res.status(201).json({token, user});
}

module.exports.loginUser = async function(req, res, next){
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({error:errors.array()});
    }
    const {email, password} = req.body;

    const user = await userModel.findOne({email}).select('+password');

    if(!user){
        return res.status(401).json({message:'Invalid email or password'});
    }

    const isMatch = await user.comparepassword(password);

    if(!isMatch){
        return res.status(401).json({message:'Invalid email or password'});
    }
    const token = user.generateAuthToken();
    
    res.cookie('token', token);
    res.status(200).json({token, user});    
}

module.exports.getUserProfile = async (req, res, next) => {
    res.status(200).json({ user: req.user });
}

module.exports.UserLogout = async (req, res, next) => {
    res.clearCookie('token');

    const token = req.cookies.token || req.headers.authorization.split(" ")[1];

    await blackListToken.create({token});

    res.status(200).json({message: "logged out"})
}