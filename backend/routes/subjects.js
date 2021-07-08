const express = require("express");
const router = express.Router();
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const Subject = require("../models/subjects");
const Student = require("../models/students");
const asyncHandler = require("../middlewares/async");
const async = require("async");

router.get("/", async (req, res) => {
  const result = await Subject.find().populate("students");
  if (!result) return res.send("Something went wrong!");
  res.send(result);
});

router.post(
  "/",
  asyncHandler(async (req, res) => {
    let students;
    if (req.body.students && req.body.name) {
      students = [...req.body.students];
    } else {
      return res.send("Error");
    }
    const allStudents = await Student.find({}, "name");
    const studentsId = students.map((name) => {
      const st = allStudents.filter((student) => student.name === name);
      if (st) return st;
    });
    const validStudents = studentsId.filter((data) => data[0]);
    const id = validStudents.map((student) => student[0]._id);
    if (!id) return res.send("Error");
    const subject = new Subject({
      name: req.body.name,
      students: [...id],
    });
    const result = await subject.save();
    if (!result) return res.send("Something went wrong!");
    async.forEachOf(id,async (i)=>{
      const st = await Student.find({ _id: i });
      await st.update({ $set: { subjects: [...st.subjects, result._id] } });
    })
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
router.put(
  "/:id",
  asyncHandler(async (req, res) => {
    const idSchema = Joi.object({
      id: Joi.objectId().required(),
    });
    const isValidData = idSchema.validate({ id: req.params.id });
    if (isValidData.error) return res.send("Invalid ID");
    const subjectSchema = Joi.object({
      name: Joi.string().required(),
    });
    const isValidName = subjectSchema.validate(req.body);
    if (isValidName.error) return res.send(isValidName.error.message);
    const result = await Subject.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          name: req.body.name,
        },
      }
    );
    if (!result) return res.send(resut.error.message);
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
    const result = await Subject.findByIdAndDelete({ _id: req.params.id });
    if (!result) return res.send("Something went wrong!");
    res.send("Successfully Deleted the Subject");
  })
);

module.exports = router;
