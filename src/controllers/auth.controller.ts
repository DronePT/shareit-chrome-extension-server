import koa from 'koa';
import { SigninDto } from '../dto/auth-login.dto';
import { AuthService } from '../services/auth.service';

export class AuthController {
  static getMe(ctx: koa.Context): void {
    const { user } = ctx.state;

    ctx.body = user;
  }

  static async signin(ctx: koa.Context): Promise<void> {
    const { email, password, avatar } = ctx.request.body;
    const dto = new SigninDto();
    dto.email = email;
    dto.password = password;
    dto.avatar = avatar;

    ctx.body = await AuthService.signin(dto);
  }
}
