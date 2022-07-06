const router = require('express').Router();

router.use("/newTask", require("./newTask"));
router.use("/tasks", require("./tasks"));

module.exports = router;