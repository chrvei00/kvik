const mongoose = require("mongoose");

const reklamasjonFormSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  q1Radio: {
    type: String,
    required: true,
  },
  q2Radio: {
    type: String,
    required: true,
  },
  additionalText: {
    type: String,
    required: true,
    default: "No extra comment.",
  },
  date: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

module.exports = mongoose.model("reklamasjonFormSchema", reklamasjonFormSchema);
