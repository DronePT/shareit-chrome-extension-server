import koa from 'koa';
import { PostsService } from '../services/posts.service';
import { SharePostDto } from '../dto/share-post.dto';

export class PostsController {
  static async shareUrl(ctx: koa.Context): Promise<void> {
    const { body } = ctx.request;

    const dto = new SharePostDto();
    dto.url = body.url;
    dto.user = ctx.state.user;

    const post = await PostsService.sharePost(dto);

    ctx.io.emit('new-share', post);

    ctx.body = post;
  }
}
