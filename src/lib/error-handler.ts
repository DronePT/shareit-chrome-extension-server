import koa from 'koa';

import { HttpError } from '../lib/http-error';

interface ErrorResponse {
  error: string;
  stack?: string;
}

export const errorHandler = () => async (ctx: koa.Context, next: () => void): Promise<void> => {
  try {
    await next();
  } catch (error) {
    const body: ErrorResponse = {
      error: '',
    };

    ctx.status = error.httpCode || error.status || error.statusCode || 500;

    if (!(error instanceof HttpError)) {
      body.error = 'Internal Server Error';

      if (process.env.NODE_ENV !== 'production') {
        body.stack = error.stack;
      }

      console.error(error);

      ctx.body = body;
      return;
    }

    body.error = error.message;

    ctx.body = body;
  }
};
