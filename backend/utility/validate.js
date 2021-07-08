const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

module.exports = function validateStudent(value) {
  const studentSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    dob: Joi.date().required(),
  });
  return studentSchema.validate(value);
};
