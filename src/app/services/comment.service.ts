import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase';
import { Comment, CommentWithUser } from '../interfaces/comment';
import { Observable, of, combineLatest } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { User } from '../interfaces/users';
import { UserService } from './user.service';
import { Article } from '../interfaces/article';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private db: AngularFirestore, private userService: UserService) {}

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

  getCommentsByArticleId(articleId: string): Observable<Comment[]> {
    return this.db
      .collection<Comment>(`articles/${articleId}/comments`)
      .valueChanges();
  }

  getCommentsWithUserByArticleId(
    articleId: string
  ): Observable<CommentWithUser[]> {
    if (articleId === undefined) {
      return of(null);
    } else {
      return this.db
        .collection<Comment>(`articles/${articleId}/comments`, (ref) =>
          ref.orderBy('updatedAt', 'desc')
        )
        .valueChanges()
        .pipe(
          switchMap((comments: Comment[]) => {
            if (comments.length) {
              const postedUids: string[] = [
                ...new Set(comments.map((comment) => comment.uid)),
              ];

              const users$: Observable<User[]> = combineLatest(
                postedUids.map((uid) => this.userService.getUserData(uid))
              );
              return combineLatest([of(comments), users$]);
            } else {
              return of([]);
            }
          }),
          map(([comments, users]) => {
            if (comments?.length) {
              return comments.map((comment: Comment) => {
                return {
                  ...comment,
                  user: users.find((user: User) => comment.uid === user?.uid),
                };
              });
            } else {
              return [];
            }
          })
        );
    }
  }

  updateComment(comment: Comment): Promise<void> {
    return this.db
      .doc<Comment>(`articles/${comment.articleId}/comments/${comment.id}`)
      .update({
        ...comment,
        updatedAt: firestore.Timestamp.now(),
      });
  }

  deleteComment(comment: Comment): Promise<void> {
    return this.db
      .doc<Article>(`articles/${comment.articleId}/comments/${comment.id}`)
      .delete();
  }
}
