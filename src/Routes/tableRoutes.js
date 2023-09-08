const router = require("express").Router();
const { calculateTable } = require("../Controllers/calculate");

router.route("/calculate").post(calculateTable);

module.exports = router;
