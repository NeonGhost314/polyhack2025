import mongoose from "mongoose";

const courantSchema = new mongoose.Schema({
  severity: { type: String, required: true },
  size: { type: Number,required: true},
});

const Courant = mongoose.model("Courant", courantSchema);

export default Courant;