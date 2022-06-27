const CronJob = require("cron").CronJob;
const sendMessage = requie("./sendSms");
const { Task } = require("../db/models");

const scheduleMessage = async (data) => {
  const { date } = data;
  const job = new CronJob(
    date,
    sendMessage(data),
    onComplete,
    true, null, null, null, 
    date.getTimezoneOffset()
  );
}

const onComplete = async (data) => { // onComplete
  try {
    const { taskId } = data;

    const task = await Task.findOne({
      where: {
        id: taskId 
      }
    });

    if(task.frequency === "once") {
      await task.update({ completed: true});
      await task.save();

      return;
    } else {

      if(task.frequency === "daily") {
        let newDate = new Date(task.date);
        newDate.setDate(newDate.getDate() + 1);
        
        task.update({ date: newDate});
        task.save();
      }

      if(task.frequency === "weekly") {
        let newDate = new Date(task.date);
        newDate.setDate(newDate.getDate() + 7);

        task.update({ date: newDate});
        task.save();
      }

      if(task.frequency === "monthly") {
        let newDate = new Date(task.date);
        newDate.setMonth(newDate.getMonth() + 1);

        task.update({ date: newDate});
        task.save();
      }
    }
    
    scheduleMessage({ date: new Date(task.date), ...data});

  } catch (err) {
    return; // TODO handle error
  }
}

module.exports = scheduleMessage;
