import { firestore } from 'firebase';
import { User } from '../interfaces/users';

export interface Request {
  id: string;
  title: string;
  body: string;
  createdAt: firestore.Timestamp;
  uid: string;
  category: string;
  commentCount: number;
}

export interface RequestWithUser extends Request {
  user: User;
}
