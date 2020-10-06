import { Schema, Types } from 'mongoose';

import { sameTitle, setUpdatedAt } from './post.methods';
import { findOneOrCreate } from './post.statics';

export const PostSchema = new Schema({
  url: String,
  title: String,
  description: String,
  image: String,
  likes: [{ type: Types.ObjectId, ref: 'user' }],
  sharedBy: { type: Types.ObjectId, ref: 'user' },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
});

PostSchema.statics.findOneOrCreate = findOneOrCreate;

PostSchema.methods.setUpdatedAt = setUpdatedAt;
PostSchema.methods.sameTitle = sameTitle;
