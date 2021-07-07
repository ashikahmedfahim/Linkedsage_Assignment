const express = require("express");
const router = express.Router();
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const Subject = require("../models/subjects");
const Student = require("../models/students");
const asyncHandler = require("../middlewares/async");

router.get("/", async (req, res) => {
  const result = await Subject.find().populate("students");
  if (!result) return res.send("Something went wrong!");
  res.send(result);
});

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const subjectSchema = Joi.object({
      name: Joi.string().required(),
    });
    const isValidData = subjectSchema.validate(req.body);
    if (isValidData.error) return res.send(isValidData.error.message);
    const subject = new Subject(req.body);
    const result = await subject.save();
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
    const result = await Subject.findOne({ _id: req.params.id });
    if (!result) return res.send("No result found");
    res.send(result);
  })
);
router.put("/:id",  asyncHandler(async (req, res) => {
  const idSchema = Joi.object({
    id: Joi.objectId().required(),
  });
  const isValidData = idSchema.validate({ id: req.params.id });
  if (isValidData.error) return res.send("Invalid ID");
  const subjectSchema = Joi.object({
    students: Joi.array().items(Joi.objectId().required()).required(),
  });
  const isValidStudentData = subjectSchema.validate(req.body);
  if (isValidStudentData.error)
    return res.send(isValidStudentData.error.message);
  const result = await Student.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        students: [...req.body.students],
      },
    }
  );
  if (!result) return res.send("Something went wrong!");
  res.send(result);
}));
router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const idSchema = Joi.object({
      id: Joi.objectId().required(),
    });
    const isValidData = idSchema.validate({ id: req.params.id });
    if (isValidData.error) return res.send("Invalid ID");
    const result = await Subject.findByIdAndDelete({ _id: req.params.id });
    if (!result) return res.send("Something went wrong!");
    res.send("Successfully Deleted the Subject");
  })
);

module.exports = router;
