import mongoose from 'mongoose';

const fishSchema = mongoose.Schema({
  severity: String,
  size: Number
});

export default mongoose.model('Fish', fishSchema);