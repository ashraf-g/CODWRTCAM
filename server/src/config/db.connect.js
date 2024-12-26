const mongoose = require("mongoose");
require("dotenv").config();
const dbConfig = process.env.MONGO_URL;

const dbConnect = () => {
  mongoose
    .connect(dbConfig, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "CODWRTCAM_DB",
    })
    .then(() => {
      console.log("Successfully connected to MongoDB");
    })
    .catch((err) => {
      console.error("Error connecting to MongoDB:", err);
    });
};

module.exports = dbConnect;
