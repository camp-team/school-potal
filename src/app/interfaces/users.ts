import { firestore } from 'firebase';

export interface User {
  name: string;
  photoURL: string;
  email: string;
  createdAt: firestore.Timestamp;
  uid: string;
  isAdmin: boolean;
  plan: 'free' | 'owner' | 'premium';
  profile: string;
  skills: string;
}
