const mongoose = require("mongoose");

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
    default: Date.now() + 24 * 60 * 60 * 1000,
  },
});

const URL = mongoose.model("URL", URLSchema);

module.exports = URL;
