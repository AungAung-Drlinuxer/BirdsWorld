import mongoose from 'mongoose';

const birdSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  breed: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  }
}, {
  timestamps: true  // Automatically adds createdAt and updatedAt
});

export default mongoose.model('Bird', birdSchema);