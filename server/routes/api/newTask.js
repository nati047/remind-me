const router = require("express").Router();
const { Task, User }= require("../../db/models");

router.post("/", async (req, res, next) => {
 try {
   if(!req.user) {
     next(); // TODO handle unauthorized request error
   }

   const { description, frequency,date } = req.body;
   const newTask = await Task.create({ frequency, date, description });

 } catch (err) {

 }
});

module.exports =  router;