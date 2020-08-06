import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase';
import { Comment } from '../interfaces/comment';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private db: AngularFirestore) {}

  addComment(comment: Omit<Comment, 'id' | 'updatedAt'>): Promise<void> {
    const id = this.db.createId();
    const value: Comment = {
      ...comment,
      id,
      updatedAt: firestore.Timestamp.now(),
    };
    return this.db
      .doc<Comment>(`articles/${comment.articleId}/comments/${value.id}`)
      .set(value);
  }
}
