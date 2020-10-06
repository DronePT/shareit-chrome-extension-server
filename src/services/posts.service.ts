import { SharePostDto } from '../dto/share-post.dto';
import { getMetadata, UrlMetadata } from '../lib/get-metadata';
import { User } from './auth.service';

export interface Post extends UrlMetadata {
  sharedBy: User;
}

export class PostsService {
  static async sharePost(sharePostDto: SharePostDto): Promise<Post> {
    const metadata = await getMetadata(sharePostDto.url);

    return { ...metadata, sharedBy: sharePostDto.user };
  }
}
