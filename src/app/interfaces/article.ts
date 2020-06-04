import { firestore } from 'firebase';

export interface Article {
  name: string;
  title: string;
  category: string;
  createdAt: firestore.Timestamp;
  featureTitle1: string;
  featureBody1: string;
  featureTitle2: string;
  featureBody2: string;
  plan: string;
  serviceURL: string;
  type: number;
  id: string;
  thumbnailURL: string;
  logo: string;
  image1: string;
  image2: string;
}
