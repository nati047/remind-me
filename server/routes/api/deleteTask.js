const router = require("express").Router();
const { Task } = require("../../db/models");

router.delete("/", async (req, res, next) => {
  const taskId = req.body.id;

  try {
    if (!req.user) {
      return res.status(401).json({ error: "Forbidden Access!" }); // TODO handle unauthorized request error
    }

    const deleted = await Task.destroy({
      where: { id: taskId }
    });

    console.log("deleted row \n", deleted)

    res.sendStatus(200);

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "server error"});
  }
});

module.exports = router;