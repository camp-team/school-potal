import { firestore, User } from 'firebase';

export interface Comment {
  id: string;
  uId: string;
  body: string;
  updatedAt: firestore.Timestamp;
}

export interface CommentWithUser extends Comment {
  user: User;
}
