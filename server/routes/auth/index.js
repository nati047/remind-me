const router = require('express').Router();
const { is } = require('express/lib/request');
const { User } = require('../../db/models');

router.get("/login", async (req, res) => {
  const { userName, password } = req.body;
  try {
    if(!userName || !password) {
      res.sendStatus(401).json({ error: 'username and password required' })
    }

    const user = await User.findOne({
      where: { userName: userName }
    });

    if (!user) {
      console.log({ error: `No user found for username: ${username}` });
      res.status(401).json({ error: "Wrong username and/or password" });
    } 
    else if (!user.correctPassword(password)) {
      console.log({ error: "Wrong username and/or password" });
      res.status(401).json({ error: "Wrong username and/or password" });
    } 
    else {
      const token = jwt.sign(
        { id: user.dataValues.id },
        process.env.SESSION_SECRET,
        { expiresIn: 86400 }
      );
      res.json({
        ...user.dataValues,
        token,
      });
    }

  }
  catch (err){
    console.log("db error\n", err);
    res.sendStatus(401).json({ error: 'server error' })
  }
});

router.post("/register", async (req, res) => {
  const newUser = req.body;
  try {
    
    if (!newUser.userName || !newUser.password || !newUser.phoneNumber) {
      res.sendStatus(400).json({ error: "all fields are required"})
    }
    
    const user = await User.create();
    
    const token = jwt.sign(
      {id: user.dataValues.id},
      process.env.SESSION_SECRET,
      { expiresIn: 60000 }
    );
    
    res.json({
      user: user.dataValues,
      token,
    });

  }
  catch  (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(401).json({ error: "User already exists" });
    }
     else if (error.name === "SequelizeValidationError") {
      return res.status(401).json({ error: "Validation error" });
    }
     else res.sendStatus(400).json({ error: 'server error' });
  }
}); 

module.exports = router;