const router = require("express").Router();
const { Task, User } = require("../../db/models");
const { scheduleMessage } = require("../../utils/scheduleMessage");

router.post("/", async (req, res, next) => {
  console.log("request made")
  try {
    if (!req.user) {
      console.log("unauthorized user")
      return res.status(401).json({ error: "Forbidden Access!" }); // TODO handle unauthorized request error
    }
    const { phoneNumber } = req.user;
    
    const { description,  taskType: frequency, date } = req.body;
    
    const dateString = date.toString();
    console.log("date string" , dateString);
    const newTask = await Task.create({ frequency, date: dateString, description });

    const data = {
      date: date,
      taskId: newTask.id,
      body: description,
      to: phoneNumber,
      from: process.env.TWILIO_PHONE_NUMBER
    }

    console.log("data sent from /mewTask to scheduleMessage \n \n", data)
    scheduleMessage(data);

    res.sendStatus(200);

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "server error"});
  }
});

module.exports = router;