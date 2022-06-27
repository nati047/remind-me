const router = require("express").Router();
const { Task, User } = require("../../db/models");
const { scheduleMessage } = require("../../utils/scheduleMessage");

router.post("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Forbidden Access!" }); // TODO handle unauthorized request error
    }
    const { phoneNumber } = req.user;

    const { description, frequency, date } = req.body;

    const dateString = date.toString();
    const newTask = await Task.create({ frequency, dateString, description });

    scheduleMessage({
      date: date,
      taskId: newTask.id,
      body: description,
      to: phoneNumber,
      from: process.env.TWILIO_PHONE_NUMBER
    });

    res.sendStatus(200);

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "server error"});
  }
});

module.exports = router;