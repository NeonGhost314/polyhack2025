import mongoose from "mongoose";

const fishSchema = new mongoose.Schema({
  severity: { type: String, required: true },
  size: { type: Number,required: true},
});

const Fish = mongoose.model("Fish", fishSchema);

export default Fish;