const rideModel = require("../models/ride.model");
const mapService = require("./map.service");
const crypto = require("crypto");

module.exports.getFare = async (pickupLocation, dropoffLocation) => {
  if (!pickupLocation || !dropoffLocation) {
    throw new Error("Pickup and dropoff locations are required");
  }

  const distanceTime = await mapService.getDistanceAndTime(
    pickupLocation,
    dropoffLocation,
  );

  const baseFare = {
    auto: 30,
    car: 50,
    bike: 20,
  };

  const perKmRate = {
    auto: 10,
    car: 15,
    bike: 5,
  };

  const perMinuteRate = {
    auto: 2,
    car: 3,
    bike: 1.5,
  };

  const fare = {
    auto: Math.round(
      baseFare.auto +
        (distanceTime.distance / 1000) * perKmRate.auto +
        (distanceTime.duration / 60) * perMinuteRate.auto,
    ),
    car: Math.round(
      baseFare.car +
        (distanceTime.distance / 1000) * perKmRate.car +
        (distanceTime.duration / 60) * perMinuteRate.car,
    ),
    bike: Math.round(
      baseFare.bike +
        (distanceTime.distance / 1000) * perKmRate.bike +
        (distanceTime.duration / 60) * perMinuteRate.bike,
    ),
  };

  return fare;
};

function genOTP(num) {
  function generateOtp(num) {
    const otp = crypto
      .randomInt(Math.pow(10, num - 1), Math.pow(10, num))
      .toString();
    return otp;
  }
  return generateOtp(num);
}

module.exports.createRide = async ({
  userId,
  pickupLocation,
  dropoffLocation,
  vehicleType,
}) => {
  if (!userId || !pickupLocation || !dropoffLocation || !vehicleType) {
    throw new Error("All fields are required");
  }

  // Get fare and distance/time data
  const fare = await module.exports.getFare(pickupLocation, dropoffLocation);
  const distanceTime = await mapService.getDistanceAndTime(
    pickupLocation,
    dropoffLocation,
  );

  const ride = await rideModel.create({
    user: userId,
    pickupLocation,
    dropoffLocation,
    fare: fare[vehicleType],
    otp: genOTP(6),
    vehicleType,
    distance: distanceTime.distance, // in meters
    duration: distanceTime.duration, // in seconds
  });

  return ride;
};

module.exports.confirmRide = async (rideId, captainId) => {
  if (!rideId) {
    throw new Error("Ride ID is required");
  }

  await rideModel.findOneAndUpdate(
    { _id: rideId },
    {
      status: "accepted",
      captain: captainId,
    },
  );

  const ride = await rideModel
    .findOne({ _id: rideId })
    .populate("user")
    .populate("captain")
    .select("+otp");
  if (!ride) {
    throw new Error("Ride not found");
  }
  return ride;
};

module.exports.startRide = async (rideId, otp, captain) => {
  if (!rideId || !otp || !captain) {
    throw new Error("Ride ID and OTP are required");
  }

  const ride = await rideModel
    .findOne({ _id: rideId })
    .populate("user")
    .populate("captain")
    .select("+otp");

  if (!ride) {
    throw new Error("Ride not found");
  }

  console.log("Ride status:", ride.status);
  console.log("Stored OTP:", ride.otp, "Provided OTP:", otp);

  if (ride.status !== "accepted") {
    throw new Error(
      `Ride is not in accepted state. Current status: ${ride.status}`,
    );
  }

  // Trim and compare OTPs as strings
  const storedOtp = String(ride.otp).trim();
  const providedOtp = String(otp).trim();

  if (storedOtp !== providedOtp) {
    throw new Error(`Invalid OTP.`);
  }

  await rideModel.findOneAndUpdate(
    { _id: rideId },
    {
      status: "ongoing",
      startTime: new Date(),
    },
  );

  return ride;
};

module.exports.endRide = async (rideId) => {
  if (!rideId) {
    throw new Error("Ride ID is required");
  }

  const ride = await rideModel
    .findOne({ _id: rideId })
    .populate("user")
    .populate("captain");

  if (!ride) {
    throw new Error("Ride not found");
  }

  console.log("Ride status:", ride.status);

  if (ride.status !== "ongoing") {
    throw new Error(
      `Ride is not in ongoing state. Current status: ${ride.status}`,
    );
  }

  await rideModel.findOneAndUpdate(
    { _id: rideId },
    {
      status: "completed",
      endTime: new Date(),
    },
  );

  return ride;
};
