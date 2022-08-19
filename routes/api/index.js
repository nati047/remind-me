const router = require("express").Router();

router.use("/user", require("./user"));
router.use("/newTask", require("./newTask"));
router.use("/tasks", require("./tasks"));
router.use("/deleteTask", require("./deleteTask"));
router.use("/completeTask", require("./completeTask"));

module.exports = router;
