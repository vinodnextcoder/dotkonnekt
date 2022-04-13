import mongoose = require("mongoose");

const WeatherApiSchema = new mongoose.Schema(
  {
    uri: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true,
      text: true
    },
    description: {
      type: String,
    },
    parameter: {
      type: [String]
    },
    apiType: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('WeatherApi', WeatherApiSchema);
