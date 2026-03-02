const express = require("express");

const router = express.Router();
const rideController = require("../controllers/ride.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const { body,query } = require("express-validator");

router.post("/create-ride",authMiddleware.authUser,
    body('pickupLocation').isString().isLength({min:3}).withMessage('Pickup location should be at least 3 characters long'),
    body('dropoffLocation').isString().isLength({min:3}).withMessage('Dropoff location should be at least 3 characters long'),
    body('vehicleType').isIn(['auto', 'car', 'bike']).withMessage('Vehicle type must be auto, car, or bike'),
    rideController.createRide);


router.get("/get-fare",authMiddleware.authUser,
    query('pickupLocation').isString().isLength({min:3}).withMessage('Pickup location should be at least 3 characters long'),
    query('dropoffLocation').isString().isLength({min:3}).withMessage('Dropoff location should be at least 3 characters long'),
    rideController.getFare);
module.exports = router;