const express = require("express");
const router = express.Router();
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const Student = require("../models/students");
const asyncHandler = require("../middlewares/async");
const subjects = require("../models/subjects");

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const result = await Student.find().populate("subjects");
    if (!result) return res.send("Something went wrong!");
    res.send(result);
  })
);
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const studentSchema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      phone: Joi.string().required(),
      dob: Joi.date().required(),
      subjects: Joi.array().items(Joi.objectId()),
    });
    const isValidData = studentSchema.validate(req.body);
    if (isValidData.error) return res.send(isValidData.error.message);
    const student = new Student(req.body);
    const result = await student.save();
    if (!result) return res.send("Something went wrong!");
    res.send(result);
  })
);
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const idSchema = Joi.object({
      id: Joi.objectId().required(),
    });
    const isValidData = idSchema.validate({ id: req.params.id });
    if (isValidData.error) return res.send("Invalid ID");
    const result = await Student.findOne({ _id: req.params.id });
    if (!result) return res.send("No result found");
    res.send(result);
  })
);
router.put(
  "/:id",
  asyncHandler(async (req, res) => {
    const idSchema = Joi.object({
      id: Joi.objectId().required(),
    });
    const isValidData = idSchema.validate({ id: req.params.id });
    if (isValidData.error) return res.send("Invalid ID");
    const studentSchema = Joi.object({
      email: Joi.string().email().required(),
      phone: Joi.string().required(),
      subjects: Joi.array().items(Joi.objectId().required()).required(),
    });
    const isValidStudentData = studentSchema.validate(req.body);
    if (isValidStudentData.error)
      return res.send(isValidStudentData.error.message);
    const result = await Student.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          email: req.body.email,
          phone: req.body.phone,
          subjects: [...req.body.subjects],
        },
      }
    );
    if (!result) return res.send("Something went wrong!");
    res.send(result);
  })
);
router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const idSchema = Joi.object({
      id: Joi.objectId().required(),
    });
    const isValidData = idSchema.validate({ id: req.params.id });
    if (isValidData.error) return res.send("Invalid ID");
    const result = await Student.findByIdAndDelete({_id: req.params.id});
    if (!result) return res.send("Something went wrong!");
    res.send("Successfully Deleted the Student");
  })
);

module.exports = router;
