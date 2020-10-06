import { Schema } from 'mongoose';
import { sameName, setUpdatedAt, validatePassword } from './user.methods';
import { findOneOrCreate } from './user.statics';

export const UserSchema = new Schema({
  userId: String,
  name: String,
  email: String,
  password: String,
  avatar: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
});

UserSchema.statics.findOneOrCreate = findOneOrCreate;

UserSchema.methods.setUpdatedAt = setUpdatedAt;
UserSchema.methods.sameName = sameName;
UserSchema.methods.validatePassword = validatePassword;
