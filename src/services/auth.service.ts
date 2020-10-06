import { UserModel } from '../database/users/user.model';
import { SigninDto } from '../dto/auth-login.dto';
import { HttpError } from '../lib/http-error';
import { JWT } from '../lib/jwt';

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  avatar: string | null;
  token?: string;
}

export class AuthService {
  static async signin(loginDto: SigninDto): Promise<Partial<User>> {
    let user = await UserModel.findOne({ email: loginDto.email });

    if (user && !(await user.validatePassword(loginDto.password))) {
      // validate passwords
      throw new HttpError('Invalid credentials.');
    }

    if (!user) {
      // Create user here!
      user = await UserModel.findOneOrCreate(loginDto);
    }

    const { email, name, avatar, _id: id } = user;

    // Create JWT token
    const publicUser = { id, email, name, avatar };

    return { ...publicUser, token: JWT.sign(publicUser) };
  }

  static validate(token: string): Partial<User> {
    return JWT.verify(token) as Partial<User>;
  }
}
