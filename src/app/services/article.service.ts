import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  QueryDocumentSnapshot,
} from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Article } from '../interfaces/article';
import { Observable } from 'rxjs';
import { firestore } from 'firebase';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Teacher } from '../interfaces/teacher';
import { AngularFireFunctions } from '@angular/fire/functions';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage,
    private snackBar: MatSnackBar,
    private fns: AngularFireFunctions
  ) {}

  async createArtile(
    article: Omit<
      Article,
      'id' | 'thumbnailURL' | 'spThumbnailURL' | 'logo' | 'updatedAt'
    >,
    images: {
      thumbnailURL: File;
      spThumbnailURL: File;
      logoURL: File;
    }
  ) {
    const id = this.db.createId();
    const urls = await this.uploadImages(id, Object.values(images));
    const [thumbnailURL, spThumbnailURL, logoURL] = urls;
    return this.db
      .doc<Article>(`articles/${id}`)
      .set({
        ...article,
        id,
        updatedAt: firestore.Timestamp.now(),
        thumbnailURL,
        spThumbnailURL,
        logoURL,
      })
      .then(() => {
        const teacherIds: string[] = article.teacherIds;
        this.setTeacherData(id, teacherIds);
      });
  }

  setTeacherData(articleId: string, teacherIds: string[]) {
    const setFn = this.fns.httpsCallable('setTeacherDataById');
    return setFn({ articleId, teacherIds }).toPromise();
  }

  getArticle(articleId: string): Observable<Article> {
    return this.db.doc<Article>(`articles/${articleId}`).valueChanges();
  }

  getArticles(): Observable<Article[]> {
    return this.db.collection<Article>('articles').valueChanges();
  }

  getArticlesLimited(startAt?: QueryDocumentSnapshot<firestore.DocumentData>) {
    return this.db
      .collection<Article>('articles', (ref) => {
        if (startAt) {
          return ref.orderBy('createdAt', 'desc').startAfter(startAt).limit(3);
        } else {
          return ref.orderBy('createdAt', 'desc');
        }
      })
      .snapshotChanges()
      .pipe(map((snaps) => snaps.map((snap) => snap.payload.doc)));
  }

  getSchools(): Observable<Article[]> {
    return this.db
      .collection<Article>('articles', (ref) => {
        return ref
          .where('type', '==', 'school')
          .orderBy('createdAt', 'desc')
          .limit(12);
      })
      .valueChanges();
  }

  getSalons(): Observable<Article[]> {
    return this.db
      .collection<Article>('articles', (ref) => {
        return ref
          .where('type', '==', 'salon')
          .orderBy('createdAt', 'desc')
          .limit(12);
      })
      .valueChanges();
  }

  getTeachers(articleId: string): Observable<Teacher[]> {
    return this.db
      .collection<Teacher>(`articles/${articleId}/teachers`)
      .valueChanges();
  }

  async uploadImages(id: string, files: Array<File | null>): Promise<string[]> {
    return Promise.all(
      files.map((file, index) => {
        if (file == null) {
          return null;
        }
        const ref = this.storage.ref(`articles/${id}-${index}`);
        return ref.put(file);
      })
    ).then(async (tasks) => {
      const urls = [];
      for (const task of tasks) {
        urls.push(await task?.ref.getDownloadURL());
      }
      return urls;
    });
  }

  async uploadImage(id: string, file: File): Promise<string> {
    const result = await this.storage.ref(`articles/${id}`).put(file);
    return await result.ref.getDownloadURL();
  }

  async updateArticle(
    article: Omit<
      Article,
      'thumbnailURL' | 'spThumbnailURL' | 'logoURL' | 'createdAt'
    >,
    images?: {
      thumbnailURL?: File;
      spThumbnailURL?: File;
      logoURL?: File;
    }
  ): Promise<void> {
    if (!Object.values(images).filter((item) => !!item).length) {
      return this.db
        .doc<Article>(`articles/${article.id}`)
        .set(
          {
            ...article,
          },
          { merge: true }
        )
        .then(() => {
          const teacherIds = article.teacherIds;
          this.setTeacherData(article.id, teacherIds);
        });
    } else {
      const urls: Array<string | null> = await this.uploadImages(
        article.id,
        Object.values(images)
      );
      const [thumbnailURL, spThumbnailURL, logoURL]: Array<
        string | null
      > = urls;

      const data = {
        ...article,
        thumbnailURL,
        spThumbnailURL,
        logoURL,
      };

      Object.keys(data).forEach((key) => {
        if (!data[key]) {
          delete data[key];
        }
      });
      return this.db
        .doc<Article>(`articles/${article.id}`)
        .set(
          {
            ...data,
          },
          { merge: true }
        )
        .then(() => {
          const teacherIds = article.teacherIds;
          this.setTeacherData(article.id, teacherIds);
        });
    }
  }

  async deleteArticle(articleId: string): Promise<void> {
    return await this.db
      .doc(`articles/${articleId}`)
      .delete()
      .then(() => {
        this.snackBar.open('記事を削除しました');
      });
  }
}
