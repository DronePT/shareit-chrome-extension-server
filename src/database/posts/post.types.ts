import { Document, Model } from 'mongoose';
import { IUser } from '../users/user.types';

export interface IPost {
  url: string;
  title: string;
  description: string;
  image: string;
  likes: string[];
  sharedBy: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IPostDocument extends IPost, Document {
  setUpdatedAt: (this: IPostDocument) => Promise<void>;
  validatePassword: (this: IPostDocument, password: string) => Promise<boolean>;
}

export interface IPostModel extends Model<IPostDocument> {
  findOneOrCreate: (this: IPostModel, post: Partial<IPost>) => Promise<IPostDocument>;
}
