import { IUser, IUserDocument, IUserModel } from './user.types';
import gravatar from 'gravatar';
import bcrypt from 'bcrypt';

export async function findOneOrCreate(
  this: IUserModel,
  user: Partial<IUser>,
): Promise<IUserDocument> {
  const record = await this.findOne(user);
  if (record) {
    return record;
  } else {
    if (!user.name) {
      user.name = user.email;
    }

    if (user.email && !user.avatar) {
      user.avatar = gravatar.url(user.email, { protocol: 'https' });
    }

    user.password = bcrypt.hashSync(user.password, process.env.BCRYPT_ROUNDS || 10);

    return this.create<Partial<IUser>>(user);
  }
}
