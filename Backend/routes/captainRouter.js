const express = require('express');

const router = express.Router();

const captainController = require("../controllers/captain.controller");

const authmiddleware = require("../middlewares/auth.middleware");

const { body } = require("express-validator");


router.post("/register",
    [body('fullName.firstName').isLength({ min: 3 }).withMessage('First name should be at least 3 character long'),
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 character long'),
    body('vehicle.color').notEmpty().withMessage('Vehicle color is required'),
    body('vehicle.plate').notEmpty().withMessage('Vehicle plate is required'),
    body('vehicle.capacity').isInt({ min: 1 }).withMessage('Vehicle capacity must be at least 1'),
    body('vehicle.vehicleType').isIn(['car', 'bike', 'auto']).withMessage('Vehicle type must be car, bike, or auto'),
    ],
    captainController.registerCaptain);

router.post("/login",[
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 character long')],
    captainController.loginCaptain);    


router.get('/profile',authmiddleware.authCaptain ,captainController.getCaptainProfile);

router.get('/logout', authmiddleware.authCaptain, captainController.captainLogout);

module.exports = router;