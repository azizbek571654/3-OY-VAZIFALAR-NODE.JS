import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true
  },
  author: {
    type: String,
    required: [true, 'Author is required'],
    trim: true
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  endDate: {
    type: Date
  },
  completed: {
    type: Boolean,
    default: false
  },
  telegramChatId: {
    type: String,
    required: true
  }
}, 
{
  timestamps: true
});

export default mongoose.model('Todo', todoSchema);
