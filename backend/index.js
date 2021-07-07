const express = require("express");
const app = express();
const cors = require("cors");
const students = require("./routes/students");
const subjects = require("./routes/subjects");
require("express-async-errors");
require("./startup/db")();

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Server is running...");
});

app.use(express.json());
app.use("/api/students", students);
app.use("/api/subjects", subjects);

app.use((err, req, res, next) => {
  console.log(error);
  res.status(500).send("Something Went Wrong");
});
