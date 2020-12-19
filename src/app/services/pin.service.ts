import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, combineLatest, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Article } from '../interfaces/article';
import { ArticleService } from './article.service';

@Injectable({
  providedIn: 'root',
})
export class PinService {
  constructor(
    private db: AngularFirestore,
    private articleService: ArticleService
  ) {}

  pinnedArticle(articleId: string, uid: string): Promise<void[]> {
    return Promise.all([
      this.db.doc(`articles/${articleId}/pinnedUids/${uid}`).set({
        articleId,
        uid,
      }),
      this.db.doc(`users/${uid}/pinnedArticles/${articleId}`).set({
        articleId,
        uid,
      }),
    ]);
  }

  unpinnedArticle(articleId: string, uid: string): Promise<void[]> {
    return Promise.all([
      this.db.doc(`articles/${articleId}/pinnedUids/${uid}`).delete(),
      this.db.doc(`users/${uid}/pinnedArticles/${articleId}`).delete(),
    ]);
  }

  isPinned(articleId: string, uid: string): Observable<boolean> {
    return this.db
      .doc(`articles/${articleId}/pinnedUids/${uid}`)
      .valueChanges()
      .pipe(map((data) => !!data));
  }

  getPinnedArticles(uid: string): Observable<Article[]> {
    return this.db
      .collectionGroup<{
        articleId: string;
        uid: string;
      }>('pinnedUids', (ref) => ref.where('uid', '==', uid))
      .valueChanges()
      .pipe(
        switchMap((pinnedArticles) => {
          if (pinnedArticles.length) {
            return combineLatest(
              pinnedArticles.map((item) =>
                this.articleService.getArticle(item.articleId)
              )
            );
          } else {
            return of(null);
          }
        })
      );
  }
}
