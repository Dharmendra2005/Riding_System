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
    auto:
      Math.round(baseFare.auto +
      (distanceTime.distance / 1000) * perKmRate.auto +
      (distanceTime.duration / 60) * perMinuteRate.auto),
    car:
      Math.round(baseFare.car +
      (distanceTime.distance / 1000) * perKmRate.car +
      (distanceTime.duration / 60) * perMinuteRate.car),
    bike:
      Math.round(baseFare.bike +
      (distanceTime.distance / 1000) * perKmRate.bike +
      (distanceTime.duration / 60) * perMinuteRate.bike),
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
  const fare = await module.exports.getFare(pickupLocation, dropoffLocation);

  //   console.log(fare);

  const ride = await rideModel.create({
    user: userId,
    pickupLocation,
    dropoffLocation,
    fare: fare[vehicleType],
    otp: genOTP(6),
  });

  return ride;
};
