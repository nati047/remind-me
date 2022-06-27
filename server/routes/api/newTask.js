const router = require("express").Router();
const { Task, User }= require("../../db/models");

router.post("/", async (req, res, next) => {
 try {
   if(!req.user) {
     return res.status(401).json({ error: "Forbidden Access!"}); // TODO handle unauthorized request error
   }

   const { description, frequency, date } = req.body;
   const newTask = await Task.create({ frequency, date, description });

 } catch (err) {

 }
});

module.exports =  router;