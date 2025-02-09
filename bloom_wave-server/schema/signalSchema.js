import mongoose from 'mongoose';
import Courant from "../schema/courantSchema.js";
import Pollution from '../schema/pollutionSchema.js';
import Fish from '../schema/fishSchema.js';

const Type = Object.freeze({
    fish: Fish,
    courant: Courant,
    pollution:Pollution
  });
const signalSchema = mongoose.Schema({
  coordinate:{type:[[]],required:true},
  size: {type:Number,required:true},
  type: { type: String, enum: Object.values(Type), required: true },
  reference: { type: mongoose.Schema.Types.ObjectId, refPath: "type" },
});

export default mongoose.model('Signal', signalSchema);