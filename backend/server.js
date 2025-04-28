const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const todosRouter = require("./routes/todos");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use("/todos", todosRouter);

mongoose
  .connect(`${process.env.MONGO_URI}`)
  .then(() => {
    console.log("DB connected");
    app.listen(PORT, () => {
      console.log(`server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("mongoDB connection error", err);
  });
