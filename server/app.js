const express  = require('express');
// const router = require('express').Router();
const app = express();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 2020;
require('dotenv').config();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// mount routers 
app.use("/auth", require("./auth"));
app.use("/api", require("./api"));


app.listen(PORT, () => {
  console.log('server listening')
})