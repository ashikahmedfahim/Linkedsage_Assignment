const express = require("express");
const app = express();
const cors = require("cors");
const students = require("./routes/students");
const subjects = require("./routes/subjects");
require("./startup/db")();

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Server is running...");
});

app.use(cors());

app.use(express.json());
app.use("/api/students", students);
app.use("/api/subjects", subjects);
app.use("/", (req, res) => {
  res.status(404).send("Page Not Found");
});
