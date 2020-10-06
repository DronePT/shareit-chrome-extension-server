import { User } from '../services/auth.service';

export class SharePostDto {
  url: string;
  user: User;
}
