const router = require("express").Router();
const { Task, User } = require("../../db/models");

router.get("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Forbidden Access!" }); // TODO handle unauthorized request error
    }

    const { id: userId } = req.user;

    const tasks = await Task.findAll({
      where: {
        userId: userId
      }
    });

    if(tasks) {
      res.status(200).json(tasks);
    } else {
      res.status(400).json({ error: "no tasks found"
      })
    }

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "server error"});
  }
});

module.exports = router;