const express = require("express");
const UrlController = require("../controller/UrlController");

const app = express.Router();

app.post("/create-url", UrlController.createShortUrl);

app.get("/:shortUrlId", UrlController.redirectToOriginalUrl);

app.delete("/:shortUrlId", UrlController.deleteUrl);

module.exports = app;
