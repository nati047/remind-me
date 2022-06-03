const router = require('express').Router();
const { User } = require('../../db/models');

router.get("/login", (req, res) => {
  res.send('login api')
});

router.post("/register", (req, res) => {
  
  res.send('login page')
});

module.exports = router;