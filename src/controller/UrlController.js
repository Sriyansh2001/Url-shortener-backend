const { INTERNAL_SERVER_ERROR } = require("../constants/constants");
const UrlService = require("../service/UrlService");
const { checkIsUrlExpire } = require("../utils/dateUtils");
const { isEmpty } = require("../utils/isEmpty");
const { generateShortUrl, isValidUrl } = require("../utils/urlUtils");

class UrlController {
  static async createShortUrl(req, res) {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ error: "Url is required" });
    }
    const isUrlValid = isValidUrl(url);
    if (!isUrlValid) {
      return res.status(400).json({ error: "Invalid Url" });
    }
    try {
      const exitsURL = await UrlService.checkIfUrlExits(url);
      if (exitsURL) {
        return res.status(409).json({
          error: "Url is already exists",
          shortUrl: `${process.env.BASE_URL}/${exitsURL}`,
        });
      }
      const shortUrl = await generateShortUrl();
      const isUrlUsed = await UrlService.getOriginalUrlObject(shortUrl);
      if (!isEmpty(isUrlUsed)) {
        return res.status(500).json({ error: "Please try again" });
      }
      await UrlService.addShortUrl(url, shortUrl);
      return res
        .status(201)
        .json({ shortUrl: `${process.env.BASE_URL}/${shortUrl}` });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: INTERNAL_SERVER_ERROR });
    }
  }

  static async redirectToOriginalUrl(req, res) {
    const { shortUrlId } = req.params;
    try {
      const originalUrlObj = await UrlService.getOriginalUrlObject(shortUrlId);
      if (isEmpty(originalUrlObj)) {
        return res.status(404).json({ error: "Url not found" });
      }
      const originalUrl = originalUrlObj.userUrl;
      const date = new Date();
      const isUrlExpire = checkIsUrlExpire({
        date,
        expireDate: originalUrlObj.expireDate,
      });
      if (isUrlExpire) {
        const shortUrlId = originalUrlObj.shortUrl;
        await UrlService.deleteUrl(shortUrlId);
        return res.status(404).json({ error: "Url expired" });
      }
      return res.redirect(originalUrl);
    } catch (err) {
      return res.status(500).json({ error: INTERNAL_SERVER_ERROR });
    }
  }

  static async deleteUrl(req, res) {
    const { shortUrlId } = req.params;
    try {
      const deletedUrl = await UrlService.deleteUrl(shortUrlId);
      if (!deletedUrl) {
        return res.status(404).json({ error: "Url not found" });
      }
      return res.status(200).json({ message: "Url deleted successfully" });
    } catch (err) {
      return res.status(500).json({ error: INTERNAL_SERVER_ERROR });
    }
  }
}

module.exports = UrlController;
