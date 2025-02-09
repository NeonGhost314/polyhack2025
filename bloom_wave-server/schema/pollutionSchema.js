import mongoose from 'mongoose';

const pollutionSchema = mongoose.Schema({
  severity: String,
  size: Number
});

export default mongoose.model('Pollution', pollutionSchema);