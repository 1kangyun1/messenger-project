const router = require("express").Router();

router.use("/getConversations", require("./getConversations"));
router.use("/updateReadTime", require("./updateReadTime"));

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

module.exports = router;
