const mongoose = require("mongoose");

const reklamasjonFormSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  telefon: {
    type: String,
  },
  ordnr: {
    type: String,
  },
  buydate: {
    type: Date,
  },
  reklamasjonsdate: {
    type: Date,
    default: Date.now(),
  },
  montering: {
    type: Boolean,
  },
  beskrivelse: {
    type: String,
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
