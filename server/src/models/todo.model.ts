import mongoose from 'mongoose';

export interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

const TodoSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

export const TodoModel = mongoose.model('Todo', TodoSchema);
