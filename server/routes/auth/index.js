const router = require("express").Router();
const jwt = require("jsonwebtoken");
const { User } = require("../../db/models");
const Joi = require("joi");

router.post("/login", async (req, res) => {
  const { userName, password } = req.body;

  if (!req.body || !userName || !password) {
    return res.status(401).json({ error: "username and password required" });
  }

  const loginSchema = Joi.object({
    userName: Joi.string().required(),
    password: Joi.string().required(),
  });

  const { error } = loginSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: "Invalid Input!" });
  }

  try {
    const user = await User.findOne({
      where: { userName: userName },
    });

    if (!user) {
      return res.status(401).json({ error: "Wrong username and/or password" });
    } else if (!user.correctPassword(password)) {
      return res.status(401).json({ error: "Wrong username and/or password" });
    } else {
      const token = jwt.sign(
        { id: user.dataValues.id },
        process.env.SESSION_SECRET,
        { expiresIn: 86400 }
      );
      return res.json({
        user: {
          userName: user.dataValues.userName,
          id: user.dataValues.id,
        },
        token,
      });
    }
  } catch (err) {
    console.log("db error\n", err);
    return res.status(401).json({ error: "server error" });
  }
});

router.post("/register", async (req, res) => {
  const newUser = req.body;
  if (
    !req.body ||
    !newUser ||
    !newUser.userName ||
    !newUser.password ||
    !newUser.phoneNumber
  ) {
    return res.status(400).json({ error: "all fields are required" });
  }
  const registrationSchema = Joi.object({
    userName: Joi.string().min(5).required(),
    phoneNumber: Joi.string().min(10).required(),
    password: Joi.string().min(8).max(15).required(),
  });
  const { error } = registrationSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: "Invalid Input!" });
  }

  try {
    const user = await User.create(newUser);
    const token = jwt.sign(
      { id: user.dataValues.id },
      process.env.SESSION_SECRET,
      { expiresIn: 300000 }
    );

    return res.json({
      user: {
        userName: user.dataValues.userName,
        id: user.dataValues.id,
      },
      token,
    });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(401).json({ error: "User already exists" });
    } else if (error.name === "SequelizeValidationError") {
      return res.status(401).json({ error: "Validation error" });
    } else {
      console.log(error);
      return res.status(400).json({ error: "server error" });
    }
  }
});

module.exports = router;
