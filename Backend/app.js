const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors"); //enable secure communication between web applications running on different origins (different domains, ports, or protocols).
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connectDB = require("./database/db");
connectDB();
app.use(cors());
app.use(cookieParser());

const userRouter = require("./routes/userRouter");
app.get("/", (req, res) => {
  res.send("hello");
});

app.use("/users", userRouter);

module.exports = app;
