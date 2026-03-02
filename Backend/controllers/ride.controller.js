const rideService = require("../services/ride.service");
const { validationResult } = require("express-validator");

module.exports.createRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  // Check if user is authenticated
  if (!req.user) {
    return res
      .status(401)
      .json({ error: "User not authenticated. Please login first." });
  }

  const { pickupLocation, dropoffLocation, vehicleType } = req.body;
  const userId = req.user._id; // Get userId from authenticated user

  //   console.log("User ID:", userId);
  try {
    const ride = await rideService.createRide({
      userId,
      pickupLocation,
      dropoffLocation,
      vehicleType,
    });
    res.status(201).json({ ride });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports.getFare = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }
  const { pickupLocation, dropoffLocation } = req.query;
  try {
    const fare = await rideService.getFare(pickupLocation, dropoffLocation);
    res.status(200).json({ fare });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
