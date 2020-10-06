import koa from 'koa';
import { PostsService } from '../services/posts.service';
import { SharePostDto } from '../dto/share-post.dto';
import { Server } from 'socket.io';
import { LikePostDto } from '../dto/like-post.dto';

export class PostsController {
  static async likePost(ctx: koa.Context): Promise<void> {
    const { postId } = ctx.params;

    const dto = new LikePostDto();
    dto.postId = postId;
    dto.user = ctx.state.user;

    await PostsService.likePost(dto);

    ctx.io.emit('new-like', postId);

    ctx.status = 201;
  }

  static async getPosts(ctx: koa.Context): Promise<void> {
    const { page = '1', perPage = '50' } = ctx.query;

    const posts = await PostsService.getPosts({
      page: parseInt(page),
      perPage: Math.min(parseInt(perPage), 50),
    });

    ctx.body = posts;
  }

  static async shareUrl(ctx: koa.Context & { io: Server }): Promise<void> {
    const { body } = ctx.request;

    const dto = new SharePostDto();
    dto.url = body.url;
    dto.user = ctx.state.user;

    const post = await PostsService.sharePost(dto);

    ctx.io.emit('new-share', post);

    ctx.body = post;
  }
}
