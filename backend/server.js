const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.get('/', (req, res, next)=> {
  console.log('server working');
})

app.listen(5000, ()=> {
  console.log('server rening on port 5000');
})