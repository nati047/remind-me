require("dotenv").config();
const PORT = process.env.PORT || 2020;

const express = require("express");
const app = express();
const { User } = require("./db/models");
const { scheduleAllTasks } = require("./utils/scheduleMessage");

const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("tiny"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
}

// authorize user using jwt
app.use((req, res, next) => {
  const token = req.headers["x-access-token"];
  if (token) {
    jwt.verify(token, process.env.SESSION_SECRET, (err, decoded) => {
        if (err) {
          return next();
        }

        User.findOne({
          where: {
            id: decoded.id,
          },
        })
          .then((user) => {
            req.user = user;
            return next();
          })
          .catch(() => {
            return next();
          });
      }
    );
  } else {
    return next();
  }
});

// mount routers
app.use("/auth", require("./routes/auth"));
app.use("/api", require("./routes/api"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

app.listen(PORT, async () => {
  scheduleAllTasks();
  console.log("server listening on port - ", PORT);
});
