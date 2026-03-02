const express = require("express");
const router = express.Router();
const mapController = require("../controllers/map.controller");
const { query } = require("express-validator");

// Route 1: Get coordinates from address
router.get(
  "/get-coordinates",
  [query("address").isString().isLength({ min: 3 })],
  mapController.getCoordinates,
);

// Route 2: Get distance and time between two locations
router.get(
  "/get-distance-time",
  [
    query("origin").isString().isLength({ min: 3 }),
    query("destination").isString().isLength({ min: 3 }),
  ],
  mapController.getDistanceTime,
);

// Route 3: Get autocomplete suggestions for address
router.get(
  "/get-Suggestions",
  [query("input").isString().isLength({ min: 1 })],
  mapController.getAutoCompleteSuggestions,
);

module.exports = router;
