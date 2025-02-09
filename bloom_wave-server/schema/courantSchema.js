import mongoose from 'mongoose';

const courantSchema = mongoose.Schema({
  severity: String,
  size: Number
});

export default mongoose.model('Fish', courantSchema);