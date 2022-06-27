require('dotenv').config();
const cors = require('cors')
const express = require('express');
const jwt = require('jsonwebtoken');
const { User } = require('./db/models');

const app = express();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 2020;


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// authorize user using jwt
app.use((req, res, next) => {
  const token = req.headers["x-access-token"];
  console.log("*********\n***********\ntoken ", token);
  if (token) {
    jwt.verify(token, process.env.SESSION_SECRET, (err, decoded) => {
      if (err)
      return next();
      User.findOne({
        where: {
          id: decoded.id
        }
      })
      .then( user => {
        req.user = user;
        return next();
      }).catch(() => {
        return next();
      });
    });
  } 
  else {
    return next();
  }
});

// mount routers 
app.use("/auth", require("./routes/auth"));
app.use("/api", require("./routes/api"));


app.listen(PORT, () => {
  console.log('server listening on port - ', PORT)
})