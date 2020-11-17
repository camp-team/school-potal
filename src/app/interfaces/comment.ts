import { firestore } from 'firebase';
import { User } from '../interfaces/users';

export interface Comment {
  id: string;
  uid: string;
  comment: string;
  updatedAt: firestore.Timestamp;
  articleId: string;
  rating: number;
}

export interface CommentWithUser extends Comment {
  user: User;
}
