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
  coordinate:{type:[[]]},
  size: {type:Number},
  type: { type: Type},
});

export default mongoose.model('Signal', signalSchema);