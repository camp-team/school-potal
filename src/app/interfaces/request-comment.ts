import { firestore } from 'firebase';
import { User } from '../interfaces/users';

export interface RequestComment {
  id: string;
  uid: string;
  body: string;
  updatedAt: firestore.Timestamp;
  requestId: string;
}

export interface RequestCommentWithUser extends RequestComment {
  user: User;
}
