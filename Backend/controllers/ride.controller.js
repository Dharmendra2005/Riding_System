const rideService = require("../services/ride.service");
const { validationResult } = require("express-validator");
const mapService = require("../services/map.service");
const { SendMessageToSocketId } = require("../socket");
const rideModel = require("../models/ride.model");

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

    // Send response to user immediately
    res.status(201).json({ ride });

    // Notify captains in background (don't let errors affect response)
    (async () => {
      try {
        const pickupCoordinates =
          await mapService.getAddressCoordinates(pickupLocation);
        console.log("Pickup Coordinates:", pickupCoordinates);

        const captains = await mapService.getCaptainsNearby(
          pickupCoordinates.lat,
          pickupCoordinates.lng,
          10, // 10 km radius
        );
        console.log("Nearby Captains:", captains.length);

        ride.otp = " ";
        console.log(`\nSending ride to ${captains.length} captains...`);

        // Fetch the ride with populated user data
        const rideWithUser = await rideModel
          .findById(ride._id)
          .populate("user")
          .lean();
        console.log("Ride data being sent:", rideWithUser);

        captains.forEach((captain) => {
          console.log(
            `Sending to captain ${captain._id}, socketId: ${captain.socketId}`,
          );
          SendMessageToSocketId(captain.socketId, {
            event: "newriderequest",
            data: rideWithUser,
          });
        });
      } catch (notifyError) {
        console.error("Error notifying captains:", notifyError.message);
      }
    })();
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

module.exports.confirmRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  const { rideId } = req.body;
  const captainId = req.captain._id;

  try {
    // Update ride with captain and change status to accepted
    const ride = await rideModel
      .findByIdAndUpdate(
        rideId,
        {
          captain: captainId,
          status: "accepted",
        },
        { new: true },
      )
      .select("+otp")
      .populate("user")
      .populate("captain");

    if (!ride) {
      return res.status(404).json({ error: "Ride not found" });
    }

    console.log(`Ride ${rideId} confirmed by captain ${captainId}`);
    console.log(
      `Notifying user ${ride.user._id}, socketId: ${ride.user.socketId}`,
    );
    console.log("Ride OTP:", ride.otp);

    // Notify user that ride is confirmed
    SendMessageToSocketId(ride.user.socketId, {
      event: "ride-confirmed",
      data: ride,
    });

    res.status(200).json({ ride });
  } catch (error) {
    console.error("Error confirming ride:", error);
    res.status(500).json({ error: error.message });
  }
};
