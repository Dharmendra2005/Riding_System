const express  = require('express');

const router  = express.Router();

const userController = require("../controllers/user.controller");

const {body} = require("express-validator");

router.post("/register", [
    body('fullName.firstName').isLength({min:3}).withMessage('First name should be at least 3 character long'),
    body('email').isEmail().withMessage('Email must be atleast 5 character long'),
    body('password').isLength({min: 6}).withMessage('Password must be atleast 6 character long')
],
userController.registerUser,
);


module.exports  = router;