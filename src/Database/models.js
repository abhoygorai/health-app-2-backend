const mongoose = require("mongoose");

const registerSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
    weight: Number,
    gender: String,
    password: String
})

module.exports = new mongoose.model("user", registerSchema);