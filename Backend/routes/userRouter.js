const express  = require('express');

const router  = express.Router();

const userController = require("../controllers/user.controller");
const authMiddlerware = require("../middlewares/auth.middleware")

const {body} = require("express-validator");

router.post("/register", [
    body('fullName.firstName').isLength({min:3}).withMessage('First name should be at least 3 character long'),
    body('email').isEmail().withMessage('Email must be atleast 5 character long'),
    body('password').isLength({min: 6}).withMessage('Password must be atleast 6 character long')
],
userController.registerUser,
);

router.post("/login", [
    body('email').isEmail().withMessage('Email is unvalid'),
    body('password').isLength({min: 6}).withMessage('Password must be atleast 6 character long')
],
    userController.loginUser,
);

router.get('/profile', authMiddlerware.authUser,
    userController.getUserProfile,
)

router.get("/logout",authMiddlerware.authUser,
    userController.UserLogout,)

module.exports  = router;