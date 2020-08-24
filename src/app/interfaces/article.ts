import { firestore } from 'firebase';

export interface Article {
  name: string;
  title: string;
  category: string;
  createdAt?: firestore.Timestamp;
  updatedAt: firestore.Timestamp;
  feature: string;
  plan: string;
  serviceURL: string;
  type: 'school' | 'salon' | null;
  id?: string;
  thumbnailURL?: string;
  logo?: string;
  teacherId: string;
  tags: string[];
}
