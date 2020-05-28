import { firestore } from 'firebase';

export interface Article {
  name: string;
  title: string;
  category: string;
  createdAt: firestore.Timestamp;
  feature: string;
  plan: string;
  id: string;
  thumbnailURL: string;
  logo: string;
  image1: string;
  image2: string;
}
