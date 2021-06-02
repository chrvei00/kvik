const mongoose = require("mongoose");

const indexNoteSchema = new mongoose.Schema({
  content: { type: String },
  username: { type: String },
  date: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("indexNoteModel", indexNoteSchema);
