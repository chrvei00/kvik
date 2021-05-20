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
});

module.exports = mongoose.model("reklamasjonFormSchema", reklamasjonFormSchema);
