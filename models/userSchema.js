const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: "Name",
  },
  email: {
    type: String,
    required: true,
    default: "example@example.com",
  },
  pwd: {
    type: String,
    required: true,
    default: "password",
  },
  admin: {
    type: Boolean,
    required: true,
    default: false,
  },
  permission: {
    feedback: {
      type: Boolean,
      required: true,
      default: false,
    },
    reklamasjon: {
      type: Boolean,
      required: true,
      default: false,
    },
    users: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
});

module.exports = mongoose.model("userSchema", userSchema);
