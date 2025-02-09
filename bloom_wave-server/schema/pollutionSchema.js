import mongoose from 'mongoose';

const pollutionSchema = mongoose.Schema({
  severity: string,
  size: number
});

export default mongoose.model('Pollution', pollutionSchema);