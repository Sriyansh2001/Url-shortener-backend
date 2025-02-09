const { URL_PARAM_SIZE } = require("../constants/urlConstants");

const generateShortUrl = async (length = URL_PARAM_SIZE) => {
  const { nanoid } = await import("nanoid");
  return nanoid(length);
};

const isValidUrl = (string) => {
  try {
    new URL(string);
    return true;
  } catch (err) {
    return false;
  }
};

module.exports = { generateShortUrl, isValidUrl };
