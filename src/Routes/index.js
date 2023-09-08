const router = require("express").Router();

router.use("/auth", require("./authRoute"));
router.use("/plan", require("./tableRoutes"));
router.get("/test", (req, res) => {
  console.log(req.body);
  res.send("chekc");
});

module.exports = router;
