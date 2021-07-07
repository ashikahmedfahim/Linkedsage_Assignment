const mongoose = require("mongoose");
require("dotenv").config();
const host = process.env.HOST;

module.exports = () => {
  mongoose
    .connect(host, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    .then(() => console.log("Connected to MongoDB..."))
    .catch((error) => console.log(error));
};
