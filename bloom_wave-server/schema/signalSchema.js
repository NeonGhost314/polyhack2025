import mongoose from 'mongoose';
import {courantSchema} from './courantSchema.js';
import {pollutionSchemaSchema} from './pollutionSchemaSchema.ts';
import {fishSchemaSchema} from './fishSchemaSchema.ts';

const Type = Object.freeze({
    Fish:   fishSchemaSchema,
    Courant:  courantSchema,
    Pollution: pollutionSchemaSchema
  });
const pollutionSchema = mongoose.Schema({
  severity: string,
  coordinate:[[]],
  size: number,
  type:Type
});

export default mongoose.model('Pollution', pollutionSchema);