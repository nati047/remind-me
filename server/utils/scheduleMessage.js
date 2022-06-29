const CronJob = require("cron").CronJob;
const sendSms = require("./sendSms");
const { Task, User } = require("../db/models");

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
        
        task.update({ date: newDate.toString()});
        task.save();
      }

      if(task.frequency === "weekly") {
        let newDate = new Date(task.date);
        newDate.setDate(newDate.getDate() + 7);

        task.update({ date: newDate.toString()});
        task.save();
      }

      if(task.frequency === "monthly") {
        let newDate = new Date(task.date);
        newDate.setMonth(newDate.getMonth() + 1);

        task.update({ date: newDate.toString()});
        task.save();
      }
    }
    
    scheduleMessage({ date: newDate, ...data});

  } catch (err) {

    return; // TODO handle error
  }
}

const scheduleMessage = async (data) => {
 try {
   const date = new Date(data.date);

   const sendReminder = () => {
    sendSms( data, onComplete);
   };

   console.log("data in scheduleMEssage - dateObj", data.date, date);
   if (date > Date.now()) {
     const job = new CronJob(
       date,
       sendReminder,
       null,
       true, null, null, null,
       date.getTimezoneOffset()
     );
     job.start();

   }
 } catch (err) {
  console.log(" cron job error \n", err);
 }

}



const scheduleAllTasks = async () => {
  try {
    const tasks = await Task.findAll({
      where: {
        completed: false
      },
      include: User
    });

    if(tasks.length > 0) {
      tasks.forEach( task => {
        console.log(" all tasks \n ********* ", task.user.phoneNumber)
        const phoneNumber  = task.user.phoneNumber;
        const date = new Date(task.date);
        if (date > Date.now()) {
          scheduleMessage({
            date: date,
            taskId: task.id,
            body: task.description,
            to: phoneNumber,
            from: process.env.TWILIO_PHONE_NUMBER
          });
        }
      });
    }

  } catch (err) {
    console.log(err);
    return;
  }
}

module.exports = { scheduleMessage, scheduleAllTasks};
