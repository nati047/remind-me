const router = require('express').Router();

router.post("/newTask", require("./newTask"));


module.exports = router;