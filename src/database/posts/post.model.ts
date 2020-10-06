import { model } from 'mongoose';
import { PostSchema } from './post.schema';
import { IPostDocument, IPostModel } from './post.types';

export const PostModel = model<IPostDocument, IPostModel>('post', PostSchema);
