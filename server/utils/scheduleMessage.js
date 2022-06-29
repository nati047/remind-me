const CronJob = require("cron").CronJob;
const sendMessage = require("./sendSms");
const { Task, User } = require("../db/models");

const scheduleMessage = async (data) => {
 try {
   const date = new Date(data.date);

   console.log("data in scheduleMEssage - dateObj", data, date)
   const job = new CronJob(
     date,
     sendMessage(data, onComplete),
     onComplete,
     true, null, null, null, 
     date.getTimezoneOffset()
   );
 } catch (err) {
  console.log(" cron job error \n", err);
 }

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

const scheduleAllTasks = () => {
  try {
    const tasks = Task.findAll({
      where: {
        completed: false
      },
      include: User
    });

    if(tasks.length > 0) {
      tasks.forEach( task => {
        const { phoneNumber } = task.user.phoneNumber;
        const date = new Date(task.date);
  
        scheduleMessage({
          date: date,
          taskId: task.id,
          body: task.description,
          to: phoneNumber,
          from: process.env.TWILIO_PHONE_NUMBER
        });
      });
    }

  } catch (err) {
    console.log(err);
    return;
  }
}

module.exports = { scheduleMessage, scheduleAllTasks};
