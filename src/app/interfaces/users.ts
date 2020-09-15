import { firestore } from 'firebase';

export interface User {
  name: string;
  photoURL: string;
  email: string;
  createdAt: firestore.Timestamp;
  updatedAt: firestore.Timestamp;
  uid: string;
  isAdmin: boolean;
  plan: 'free' | 'owner' | 'premium';
  profile: string;
  links: string[];
  tags: string[];
  pinnedArticleIds: string[];
}
