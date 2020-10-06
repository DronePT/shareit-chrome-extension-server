import { model } from 'mongoose';
import { UserSchema } from './user.schema';
import { IUserDocument, IUserModel } from './user.types';

export const UserModel = model<IUserDocument, IUserModel>('user', UserSchema);
