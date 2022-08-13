require('dotenv').config();
const PORT = process.env.PORT || 2020;

const express = require('express');
const app = express();
const { User } = require('./db/models');
const { scheduleAllTasks } = require("./utils/scheduleMessage");

const jwt = require('jsonwebtoken');
const bodyParser = require("body-parser");
const cors = require('cors');
const morgan = require('morgan');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('tiny'));

// authorize user using jwt
app.use((req, res, next) => {
  const token = req.headers["x-access-token"];
  console.log("request header token \n", token)
  if (token) {
    jwt.verify(JSON.parse(token), process.env.SESSION_SECRET, (err, decoded) => {
      if (err) {
        return next();
      } 
      
      console.log(" token verified \n")
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


app.listen(PORT, async () => {
  scheduleAllTasks();
  console.log('server listening on port - ', PORT);
})