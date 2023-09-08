const dotenv = require("dotenv")
dotenv.config()

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const router = require("./src/Routes");
const mongoose = require("mongoose");
const morgan = require("morgan");
// const cookieParser = require("cookie-parser")

const app = express();
corsOptions = {
  origin: ["*"],
  credentials: true,
  methods: ["GET", "POST"],
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: false }));
app.use(bodyParser.json());
app.use(morgan('tiny'));
// app.use(cookieParser);

const mongoUrl = process.env.MONGO_URL;
mongoose.connect(mongoUrl);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

app.use("/api/v1", router);

app.listen(4000, () => {
  console.log("sever stared at port 4000");
});
