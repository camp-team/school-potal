import { firestore } from 'firebase';
import { User } from '../interfaces/users';

export interface Comment {
  id: string;
  uId: string;
  body: string;
  updatedAt: firestore.Timestamp;
  articleId: string;
}

export interface CommentWithUser extends Comment {
  user: User;
}
