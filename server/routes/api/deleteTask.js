const router = require("express").Router();
const Joi = require("joi");
const { Task } = require("../../db/models");

router.post("/", async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: "Forbidden Access!" });
  }

  if (!req.body || !req.body.id) {
    return res.status(400).json({ error: "Request body missing!" });
  }

  const schema = Joi.object({
    id: Joi.number().required(),
  });
  const { error } = schema.validate(req.body);

  if (error) {
    console.log(error.details);
    return res.status(400).json({ error: "Invalid request body" });
  }

  const taskId = req.body.id;

  try {
    const deleted = await Task.destroy({
      where: { id: taskId },
    });

    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "server error" });
  }
});

module.exports = router;
