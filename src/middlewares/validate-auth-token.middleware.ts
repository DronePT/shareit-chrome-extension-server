import koa from 'koa';
import { HttpError } from '../lib/http-error';
import { AuthService } from '../services/auth.service';

export const validateTokenMiddleware = () => async (
  ctx: koa.Context,
  next: () => void,
): Promise<void> => {
  try {
    const { authorization } = ctx.request.headers;

    const [, token] = authorization.split(' ') as string[];

    ctx.state.user = AuthService.validate(token);

    await next();
  } catch (error) {
    if (error.name && error.name === 'JsonWebTokenError') {
      throw new HttpError('Invalid token', 401);
    }

    throw error;
  }
};
