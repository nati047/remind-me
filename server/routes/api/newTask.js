const router = require("express").Router();
const { Task, User } = require("../../db/models");
const { scheduleMessage } = require("../../utils/scheduleMessage");
const Joi = require("joi");

router.post("/", async (req, res, next) => {
  if (!req.user) {
    return res.status(403).json({ error: "Forbidden Access!" }); // TODO handle unauthorized request error
  }
  const { phoneNumber, id: userId } = req.user;

  if (!req.body) {
    return res.status(400).json({ error: "Request body missing!" });
  }

  const schema = Joi.object({
    description: Joi.string().min(5).required(),
    date: Joi.string().required(),
    taskType: Joi.string().required(),
  });
  const { error } = schema.validate(req.body);

  if (error) {
    console.log(error.details);
    return res.status(400).json({ error: "Invalid request body" });
  }

  const { description, taskType: frequency, date } = req.body;
  const dateString = date.toString();

  try {
    const newTask = await Task.create({
      frequency,
      date: dateString,
      description,
      userId: userId,
    });

    const data = {
      date: date,
      taskId: newTask.id,
      body: description,
      to: phoneNumber,
      from: process.env.TWILIO_PHONE_NUMBER,
    };

    console.log("data sent from /newTask to scheduleMessage \n \n", data);
    scheduleMessage(data);

    res.json(newTask);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "server error" });
  }
});

module.exports = router;
