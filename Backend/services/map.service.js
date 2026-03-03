const axios = require("axios");
const captainModel = require("../models/captain.model");

module.exports.getAddressCoordinates = async (address) => {
  const apiKey = process.env.OPENWEATHERMAP_API_KEY;
  const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(address)}&limit=1&appid=${apiKey}`;

  try {
    const response = await axios.get(url);
    // console.log("OpenWeatherMap API Response:", response.data);

    if (response.data && response.data.length > 0) {
      const location = response.data[0];
      return {
        lat: location.lat,
        lng: location.lon,
        name: location.name,
        country: location.country,
        state: location.state,
      };
    } else {
      throw new Error(
        `Geocoding API error: Location not found for address: ${address}`,
      );
    }
  } catch (error) {
    console.error(
      "Error fetching coordinates from OpenWeatherMap:",
      error.message,
    );
    throw error;
  }
};

module.exports.getDistanceAndTime = async (origin, destination) => {
  if (!origin || !destination) {
    throw new Error("Both origin and destination are required");
  }

  try {
    // Get coordinates for both origin and destination
    const originCoords = await module.exports.getAddressCoordinates(origin);
    const destinationCoords =
      await module.exports.getAddressCoordinates(destination);

    // Use OSRM (Open Source Routing Machine) - free, no API key needed
    const url = `https://router.project-osrm.org/route/v1/driving/${originCoords.lng},${originCoords.lat};${destinationCoords.lng},${destinationCoords.lat}?overview=false`;

    const response = await axios.get(url);
    // console.log("OSRM API Response:", response.data);

    if (
      response.data &&
      response.data.routes &&
      response.data.routes.length > 0
    ) {
      const route = response.data.routes[0];
      return {
        distance: route.distance, // in meters
        duration: route.duration, // in seconds
        distanceInKm: (route.distance / 1000).toFixed(2),
        durationInMinutes: (route.duration / 60).toFixed(2),
      };
    } else {
      throw new Error(
        `Route API error: Unable to calculate distance and time for origin: ${origin} and destination: ${destination}`,
      );
    }
  } catch (error) {
    console.error("Error fetching distance and time from OSRM:", error.message);
    throw error;
  }
};

module.exports.getAutoCompleteSuggestions = async (input) => {
  if (!input) {
    throw new Error("Input is required for autocomplete suggestions");
  }
  const apiKey = process.env.OPENWEATHERMAP_API_KEY;
  const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(input)}&limit=5&appid=${apiKey}`;

  try {
    const response = await axios.get(url);
    // console.log("OpenWeatherMap API AutoComplete Response:", response.data);
    if (response.data && response.data.length > 0) {
      return response.data.map((location) => {
        // Create formatted description like Google Places API
        const parts = [location.name];
        if (location.state) parts.push(location.state);
        if (location.country) parts.push(location.country);

        return {
          name: location.name,
          country: location.country,
          state: location.state || null,
          lat: location.lat,
          lng: location.lon,
          description: parts.join(", "), // Full formatted address
        };
      });
    } else {
      return [];
    }
  } catch (error) {
    console.error(
      "Error fetching autocomplete suggestions from OpenWeatherMap:",
      error.message,
    );
    throw error;
  }
};

module.exports.getCaptainsNearby = async (ltd, lng, radius) => {
  // radius in km
  // Haversine formula to calculate distance between two coordinates
  const toRadians = (degree) => degree * (Math.PI / 180);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in km
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };

  // Check ALL captains first
  const allCaptainsInDB = await captainModel.find({});
  console.log("\n=== Database Debug ===");
  console.log(`Total captains in database: ${allCaptainsInDB.length}`);
  allCaptainsInDB.forEach((captain, i) => {
    console.log(
      `Captain ${i + 1}: status="${captain.status}", location=${captain.location?.ltd ? `(${captain.location.ltd}, ${captain.location.lng})` : "NOT SET"}, socketId=${captain.socketId || "null"}`,
    );
  });

  // Get all active captains
  const allCaptains = await captainModel.find({ status: "active" });

  console.log("\n=== Captain Search Debug ===");
  console.log(`Search Location: ltd=${ltd}, lng=${lng}, radius=${radius}km`);
  console.log(`Total active captains: ${allCaptains.length}`);

  // Filter captains by distance
  const nearbyCaptains = allCaptains.filter((captain) => {
    if (!captain.location || !captain.location.ltd || !captain.location.lng) {
      console.log(`Captain ${captain._id} has no location data`);
      return false;
    }
    const distance = calculateDistance(
      ltd,
      lng,
      captain.location.ltd,
      captain.location.lng,
    );
    console.log(
      `Captain ${captain._id}: location(${captain.location.ltd}, ${captain.location.lng}), distance=${distance.toFixed(10)}km`,
    );
    return distance <= radius;
  });

  console.log(`Captains within ${radius}km: ${nearbyCaptains.length}`);
  console.log("===========================\n");

  return nearbyCaptains;
};
