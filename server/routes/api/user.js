const router = require("express").Router();
const Joi = require("joi");

router.get("/", async (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: "Forbidden Access!" });
  }
  const user = {
    userName: req.user.userName,
    id: req.user.id,
  };
  res.json(user);
});

module.exports = router;
