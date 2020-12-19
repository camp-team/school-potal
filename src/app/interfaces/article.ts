import { firestore } from 'firebase';

export interface Article {
  name: string;
  title: string;
  category: string;
  createdAt?: firestore.Timestamp;
  updatedAt: firestore.Timestamp;
  features: string[];
  topics?: string;
  plans: Array<{
    planName: string;
    planBody: string;
    plice: string;
  }>;
  serviceURL: string;
  type: 'school' | 'salon' | null;
  id?: string;
  thumbnailURL?: string;
  spThumbnailURL?: string;
  logo?: string;
  teacherIds?: string[];
  tags?: string[];
  likeCount: number;
  pinCount: number;
}
