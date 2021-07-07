const express = require("express");
const router = express.Router();
const Joi = require("joi")
Joi.objectId = require("joi-objectid")(Joi);
const Student = require("../models/students");


router.get("/", async (req, res) => {
  const result = await Student.find({});
  if(!result) return res.send("Something went wrong!");
  res.send(result);
});
router.post("/", (req, res) => {

});
router.get("/:id", (req, res) => {});
router.put("/:id", (req, res) => {});
router.delete("/:id", (req, res) => {});

module.exports = router;
