import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, combineLatest } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LikeService {
  constructor(private db: AngularFirestore) {}

  likeArticle(articleId: string, uid: string): Promise<void[]> {
    return Promise.all([
      this.db.doc(`articles/${articleId}/likedUids/${uid}`).set({
        articleId,
        uid,
      }),
    ]);
  }

  unlikeArticle(articleId: string, uid: string): Promise<void[]> {
    return Promise.all([
      this.db.doc(`articles/${articleId}/likedUids/${uid}`).delete(),
    ]);
  }

  isLiked(articleId: string, uid: string): Observable<boolean> {
    return this.db
      .doc(`articles/${articleId}/likedUids/${uid}`)
      .valueChanges()
      .pipe(map((data) => !!data));
  }

  // getlikedUids(articleId: string): Observable<string[]> {
  //   return this.db.collection(`articles/${articleId}/likedUids`).valueChanges();
  // }
}
