const userModel = require("../models/user-model");
const userService = require("../services/user.service");

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
