const mongoose = require("mongoose");
const { ONE_DAYS_TIME } = require("../constants/constants");

const URLSchema = mongoose.Schema({
  userId: {
    type: mongoose.ObjectId,
  },
  userUrl: {
    type: String,
    required: true,
  },
  shortUrl: {
    type: String,
    required: true,
  },
  expireDate: {
    type: Date,
    default: Date.now() + ONE_DAYS_TIME,
  },
});

const URL = mongoose.model("URL", URLSchema);

module.exports = URL;
