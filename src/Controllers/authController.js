const registerModel = require("../Database/models");
const bcrypt = require("bcrypt");
const { makeToken } = require("../Jwt/webtoken");

exports.register = async (req, res) => {
  const obj = await registerModel.findOne({ email: req.body.email });

  if (obj != null) {
    res.status(208).json({ message: "user is already registered" });
  } else {
    const salt = bcrypt.genSaltSync(2);
    bcrypt.hash(req.body.password, salt, function (err, hash) {
      const user = new registerModel({
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
        weight: req.body.weight,
        gender: req.body.gender,
        password: hash,
      });

      try {
        user.save();
        res.status(200).send(user);
      } catch (error) {
        res.status(500).send(error);
      }
    });
  }
};

exports.login = async (req, res) => {
  const obj = await registerModel.findOne({ email: req.body.email });
  // const token = await makeToken({ email: req.body.email });
  console.log(req);
  
  if (!obj) {
    res.status(204).send();
  } else {
    bcrypt.compare(req.body.password, obj.password, function (err, result) {
      if (err) {
        res.status(500).send();
      } else if (result) {
        res.status(200).send();
      } else {
        res.status(203).send();
      }
    });
  }
};
