const express = require("express");
const connectDB = require("./config/database");
const env = require("dotenv");
const urlRoute = require("./routes/urlRoutes");
env.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use("/", urlRoute);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("running on port 3000");
  });
});
