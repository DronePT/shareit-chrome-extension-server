import { Document, Model } from 'mongoose';

export interface IUser {
  name: string;
  email: string;
  password: string;
  avatar: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUserDocument extends IUser, Document {
  setUpdatedAt: (this: IUserDocument) => Promise<void>;
  validatePassword: (this: IUserDocument, password: string) => Promise<boolean>;
}

export interface IUserModel extends Model<IUserDocument> {
  findOneOrCreate: (this: IUserModel, user: Partial<IUser>) => Promise<IUserDocument>;
}
