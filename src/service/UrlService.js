const URL = require("../modal/Url");

class UrlService {
  static async checkIfUrlExits(url) {
    if (!url) return false;
    const userUrl = await URL.findOne({ userUrl: url });
    if (userUrl) return userUrl.shortUrl;
    return false;
  }

  static async addShortUrl(url, shortUrl) {
    if (!url || !shortUrl) return false;
    const newUrl = new URL({
      userUrl: url,
      shortUrl: shortUrl,
    });
    await newUrl.save();
    return true;
  }

  static async getOriginalUrlObject(shortUrlId) {
    if (!shortUrlId) return false;
    const urlObj = await URL.findOne({ shortUrl: shortUrlId });
    return urlObj ? urlObj : false;
  }

  static async deleteUrl(shortUrlId) {
    if (!shortUrlId) return false;
    const deletedUrl = await URL.findOneAndDelete({ shortUrl: shortUrlId });
    return deletedUrl ? true : false;
  }
}

module.exports = UrlService;
