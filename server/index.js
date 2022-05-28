const express  = require('express');
const app = express();
const bodyParser = require("body-parser");
require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send('<h1>Hola</h1>')
})

app.listen(2020, () => {
  console.log('server listening')
})