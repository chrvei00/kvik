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
  telefon: {
    type: String,
    required: true,
  },
  ordnr: {
    type: String,
    required: true,
  },
  buydate: {
    type: Date,
    required: true,
  },
  reklamasjonsdate: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  montering: {
    type: Boolean,
    required: true,
  },
  beskrivelse: {
    type: String,
    required: true,
  },
  images: [
    {
      url: String,
      filename: String,
    },
  ],
  finished: {
    type: Boolean,
    default: false,
  },
  note: {
    content: String,
    username: String,
    dato: Date,
  },
  sett: [
    {
      username: String,
    },
  ],
});

module.exports = mongoose.model("Reklamasjon", reklamasjonFormSchema);
