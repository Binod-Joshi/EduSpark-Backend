const mongoose = require("mongoose");

const SocietySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  institue: [{ type: mongoose.Schema.Types.ObjectId, ref: "Institue" }],
},{timestamps:true});

module.exports = mongoose.model("SocietySchema", SocietySchema);
