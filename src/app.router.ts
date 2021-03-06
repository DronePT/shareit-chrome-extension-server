import Router from 'koa-router';
import { AuthController } from './controllers/auth.controller';
import { PostsController } from './controllers/posts.controller';
import { validateTokenMiddleware } from './middlewares/validate-auth-token.middleware';

export const appRouter = new Router();

appRouter.post('/signin', AuthController.signin);
appRouter.get('/me', validateTokenMiddleware(), AuthController.getMe);
appRouter.get('/posts', validateTokenMiddleware(), PostsController.getPosts);
appRouter.post('/share', validateTokenMiddleware(), PostsController.shareUrl);
appRouter.post('/posts/:postId/like', validateTokenMiddleware(), PostsController.likePost);
