const router = require('express').Router();
const jwt = require("jsonwebtoken");
const { User } = require('../../db/models');

router.get("/login", async (req, res) => {
  const { userName, password } = req.body;
  try {
    if(!userName || !password) {
      return res.status(401).json({ error: 'username and password required' })
    }

    const user = await User.findOne({
      where: { userName: userName }
    });

    if (!user) {
      console.log({ error: `No user found for username: ${username}` });
      return res.status(401).json({ error: "Wrong username and/or password" });
    } 
    else if (!user.correctPassword(password)) {
      console.log({ error: "Wrong username and/or password" });
      return res.status(401).json({ error: "Wrong username and/or password" });
    } 
    else {
      const token = jwt.sign(
        { id: user.dataValues.id },
        process.env.SESSION_SECRET,
        { expiresIn: 86400 }
      );
     return res.json({
        userName: user.dataValues.userName,
        id: user.dataValues.id,
        token,
      });
    }

  }
  catch (err){
    console.log("db error\n", err);
    return res.status(401).json({ error: 'server error' })
  }
});

router.post("/register", async (req, res) => {
  const newUser = req.body;
  console.log("-----------------------\nregister called", newUser)
  try {
    
    if (!newUser || !newUser.userName || !newUser.password || !newUser.phoneNumber) {
      console.log("-----------------------\n missing stuff")
      return res.status(400).json({ error: "all fields are required"});
      
    }
    
    const user = await User.create(newUser);
    console.log("user added to db", user.dataValues);
    const token = jwt.sign(
      { id: user.dataValues.id },
      process.env.SESSION_SECRET,
      { expiresIn: 300000 }
    );

    console.log("-----------------------\nregister sucess")
    return res.json({ user :{
      userName: user.dataValues.userName,
      id: user.dataValues.id,
    },
    token,
    });

  }
  catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      console.log("-----------------------\n user exists")
      return res.status(401).json({ error: "User already exists" });
    }
    else if (error.name === "SequelizeValidationError") {
      console.log("-----------------------\n validation error")
      return res.status(401).json({ error: "Validation error" });
    }
    else {
      console.log(error)
      return res.status(400).json({ error: 'server error' });
    }
  }
}); 

module.exports = router;