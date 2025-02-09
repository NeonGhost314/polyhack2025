import mongoose from "mongoose";

const pollutionSchema = new mongoose.Schema({
  severity: { type: String, required: true },
  size: { type: Number,required: true},
});

const Pollution = mongoose.model("Pollution", pollutionSchema);

export default Pollution;