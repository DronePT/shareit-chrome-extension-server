import { PostModel } from '../database/posts/post.model';
import { IPost, IPostDocument } from '../database/posts/post.types';
import { LikePostDto } from '../dto/like-post.dto';

import { SharePostDto } from '../dto/share-post.dto';
import { getMetadata, UrlMetadata } from '../lib/get-metadata';
import { HttpError } from '../lib/http-error';
import { User } from './auth.service';

export interface Post extends UrlMetadata {
  sharedBy: User;
}

interface GetPostsFilters {
  page: number;
  perPage: number;
}

export class PostsService {
  static async likePost(dto: LikePostDto): Promise<IPostDocument> {
    const post = await PostModel.findById(dto.postId);

    if (!post) {
      throw new HttpError('post not found', 404);
    }

    if (post.likes.indexOf(dto.user.id) > -1) {
      throw new HttpError(`You've already liked this post!`, 403);
    }

    post.likes.push(dto.user.id);

    await post.save();

    return post;
  }

  static async getPosts(filters: GetPostsFilters): Promise<IPostDocument[]> {
    const { page, perPage } = filters;

    const posts = await PostModel.find()
      .limit(perPage)
      .skip((page - 1) * perPage)
      .sort({ createdAt: -1 })
      .populate({ path: 'sharedBy', select: { name: 1, avatar: 1 } })
      .populate({ path: 'likes', select: { name: 1, avatar: 1 } });

    return posts;
  }

  static async sharePost(sharePostDto: SharePostDto): Promise<IPostDocument> {
    const metadata = await getMetadata(sharePostDto.url);

    const sharedBy = sharePostDto.user.id;
    const likes: string[] = [];

    const post: IPost = { ...metadata, likes, sharedBy };

    const dbPost = await PostModel.findOneOrCreate(post);

    return dbPost;
  }
}
