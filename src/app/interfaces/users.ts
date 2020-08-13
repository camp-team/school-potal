export interface User {
  name: string;
  photoURL: string;
  email: string;
  createdAt: Date;
  uid: string;
  isAdmin: boolean;
  plan: 'free' | 'owner' | 'premium';
  profile: string;
  skills: string;
}
