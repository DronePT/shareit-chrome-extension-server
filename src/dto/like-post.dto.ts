import { User } from '../services/auth.service';

export class LikePostDto {
  postId: string;
  user: User;
}
