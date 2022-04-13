import mongoose = require("mongoose");

const WeatherApiMapperSchema = new mongoose.Schema(
  {
    region: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true,
      text: true
    },
    mapNo: {
      type: String,
    },
    country: {
      type: String
    },
    apiType: {
      type: String,
    },
    lat: {
      type: String,
    },
    lon: {
      type: String
    },
    tz_id: {
      type: String,
    },
    localtime: {
      type: String
    },
    mapName: {
      type: String,
      required: true
    },
    forecast: {
      sunrise: {
        type: String
      },
      sunset: {
        type: String
      },
      moonrise: {
        type: String
      },
      moonset: {
        type: String
      },
      moon_phase: {
        type: String
      },
      moon_illumination: {
        type: String
      }
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('WeatherApiMapper', WeatherApiMapperSchema);
