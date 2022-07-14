const router = require("express").Router();
const { Task } = require("../../db/models");

router.post("/", async (req, res, next) => {
  const taskId = req.body.id;
  
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Forbidden Access!" }); // TODO handle unauthorized request error
    }

    const task = await Task.findOne({
      where: { id: taskId }
    });

    await task.update({ completed: true })
    
    console.log("updated row \n", task)

    res.sendStatus(200);

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "server error"});
  }
});

module.exports = router;