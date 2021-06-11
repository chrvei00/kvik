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
  phone: {
    type: String,
    required: true,
  },
  store: {
    type: String,
    required: true,
  },
  seller: {
    type: String,
    required: true,
  },
  orderNumber: {
    type: String,
    required: true,
  },
  orderDate: {
    type: Date,
    required: true,
  },
  reklamasjonsDate: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  assembly: {
    type: Boolean,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  images: [
    {
      url: String,
      filename: String,
    },
  ],
  status: {
    type: Boolean,
    default: false,
  },
  underConstruction: {
    type: Boolean,
    default: false,
  },
  expectedFinished: {
    type: Date,
    default: Date.now() + 12096e5,
  },
  finished: {
    type: Date,
  },
  notes: [
    {
      content: String,
      username: String,
      date: Date,
    },
  ],
  caseNumber: {
    type: String,
    default: Date.now().toString().substr(7),
  },
  stats: {
    seen: [
      {
        userId: {
          type: String,
        },
        seenDate: {
          type: Date,
        },
      },
    ],
    finishedInTime: {
      type: Boolean,
    },
  },
});

module.exports = mongoose.model("Reklamasjon", reklamasjonFormSchema);
