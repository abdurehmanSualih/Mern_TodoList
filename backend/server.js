const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();


const app = express();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res, next) => {
  res.send("server is working");
});

mongoose
  .connect(
    `${process.env.MONGO_URI}`
  )
  .then(() => {
    console.log("DB connected");
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("mongoDB connection error", err);
  });
