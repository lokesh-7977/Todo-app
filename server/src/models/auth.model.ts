import mongoose, { Schema, Document } from "mongoose";
import { v4 as uuidv4 } from 'uuid';

export interface User extends Document {
  id: number;
  uuid: string;
  email: string;
  name: string;
  password: string;
}

export const AuthSchema = new Schema(
  {
    id: {
      type: Number,
      unique: true,
      default: 0,
    },
    uuid: {
      type: String,
      unique: true,
      default: () => uuidv4(),  
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: [6, "Name must be at least 6 characters long"],
      maxlength: [25, "Name cannot exceed 25 characters"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
  },
  { timestamps: true }
);

AuthSchema.pre('save', async function (next) {
  if (!this.isNew) return next();

  const count = await this.model('auth').countDocuments();
  this.id = count + 1;
  next();
});

export const AuthModel = mongoose.model<User>("auth", AuthSchema);
