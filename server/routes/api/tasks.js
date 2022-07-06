const router = require("express").Router();
const { Task, User } = require("../../db/models");

router.post("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Forbidden Access!" }); // TODO handle unauthorized request error
    }

    const { id: userId } = req.user;
    const newTask = await Task.create({ frequency, date: dateString, description, userId: userId });

    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "server error"});
  }
});

module.exports = router;