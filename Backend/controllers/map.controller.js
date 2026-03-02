const mapService = require("../services/map.service");
const { validationResult } = require("express-validator");

module.exports.getCoordinates = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  const { address } = req.query;
  try {
    const coordinates = await mapService.getAddressCoordinates(address);
    res.status(200).json({ coordinates });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch coordinates" });
  }
};

module.exports.getDistanceTime = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }
  try {
    const { origin, destination } = req.query;
    const result = await mapService.getDistanceAndTime(origin, destination);
    res
      .status(200)
      .json({ distance: result.distance, duration: result.duration });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch distance and time" });
  }
};

module.exports.getAutoCompleteSuggestions = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }
  try {
    const { input } = req.query;
    const suggestions = await mapService.getAutoCompleteSuggestions(input);
    res.status(200).json({ suggestions });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch suggestions" });
  }
};
