import Koa from 'koa';
import bodyparser from 'koa-bodyparser';
import morgan from 'koa-morgan';

import { appRouter } from './app.router';
import { Database } from './database';
import { errorHandler } from './lib/error-handler';

export const app = new Koa();

Database.connect();

app.use(morgan('combined'));
app.use(bodyparser());

app.use(errorHandler());

app.use(appRouter.routes());
