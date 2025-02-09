import mongoose from 'mongoose';
import {courantSchema} from './courantSchema';
import {pollutionSchemaSchema} from './pollutionSchemaSchema';
import {fishSchemaSchema} from './fishSchemaSchema';

const Type = Object.freeze({
    Fish:   fishSchemaSchema,
    Courant:  courantSchema,
    Pollution: pollutionSchemaSchema
  });
const pollutionSchema = mongoose.Schema({
  severity: String,
  coordinate:[[]],
  size: Number,
  type:Type
});

export default mongoose.model('Pollution', pollutionSchema);