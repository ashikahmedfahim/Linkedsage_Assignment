const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    minlength: 5,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    minlength: 9,
    maxlength: 9,
    validate: {
      validator: function () {
        return this.phone[0] === "+";
      },
    },
  },
  dob: {
    type: Date,
    min: '1987-09-28',
    max: Date.now,
    required: true,
  },
  subjects: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Subject",
  },
});

module.exports = mongoose.model("Student", studentSchema);
