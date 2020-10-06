import { PostModel } from '../database/posts/post.model';
import { IPost, IPostDocument } from '../database/posts/post.types';

import { SharePostDto } from '../dto/share-post.dto';
import { getMetadata, UrlMetadata } from '../lib/get-metadata';
import { User } from './auth.service';

export interface Post extends UrlMetadata {
  sharedBy: User;
}

interface GetPostsFilters {
  page: number;
  perPage: number;
}

export class PostsService {
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
