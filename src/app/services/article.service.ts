import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Article } from '../interfaces/article';
import { Observable } from 'rxjs';
import { firestore } from 'firebase';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Teacher } from '../interfaces/teacher';
import { AngularFireFunctions } from '@angular/fire/functions';
import { UserService } from './user.service';

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
      'id' | 'thumbnailURL' | 'logo' | 'image1' | 'image2' | 'updatedAt'
    >,
    images: {
      thumbnailURL: File;
      logo: File;
      image1?: File;
      image2?: File;
    }
  ) {
    const id = this.db.createId();
    const urls = await this.uploadImage(id, Object.values(images));
    const [thumbnailURL, logo, image1, image2] = urls;
    return this.db.doc<Article>(`articles/${id}`).set({
      ...article,
      id,
      updatedAt: firestore.Timestamp.now(),
      thumbnailURL,
      logo,
      image1,
      image2,
    });
  }

  async uploadImage(id: string, files: File[]): Promise<string[]> {
    return Promise.all(
      files.map((file, index) => {
        const ref = this.storage.ref(`articles/${id}-${index}`);
        return ref.put(file);
      })
    ).then(async (tasks) => {
      const urls = [];
      for (const task of tasks) {
        urls.push(await task.ref.getDownloadURL());
      }
      return urls;
    });
  }

  setTeacherData(teacherId: string) {
    const setFn = this.fns.httpsCallable('setTeacherDataById');
    console.log(teacherId);
    return setFn(teacherId).toPromise();
  }

  getArticle(articleId: string): Observable<Article> {
    return this.db.doc<Article>(`articles/${articleId}`).valueChanges();
  }

  getArticles(): Observable<Article[]> {
    return this.db
      .collection<Article>('articles', (ref) => {
        return ref.limit(15);
      })
      .valueChanges();
  }

  getTeachers(): Observable<Teacher[]> {
    return this.db
      .collection<Teacher>(`teachers`, (ref) => {
        return ref.limit(3);
      })
      .valueChanges();
  }

  async updateArticle(
    article: Omit<
      Article,
      'thumbnailURL' | 'logo' | 'image1' | 'image2' | 'createdAt'
    >,
    images?: {
      thumbnailURL?: File;
      logo?: File;
      image1?: File;
      image2?: File;
    }
  ): Promise<void> {
    if (!Object.values(images).filter((item) => !!item).length) {
      return this.db.doc<Article>(`articles/${article.id}`).set(
        {
          ...article,
        },
        { merge: true }
      );
    } else {
      const urls = await this.uploadImage(
        article.id,
        Object.values(images).filter((item) => item !== null)
      );
      const [thumbnailURL, logo, image1, image2]: Array<string | null> = urls;

      const data = {
        ...article,
        thumbnailURL,
        logo,
        image1,
        image2,
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
          const teacherId = article.teacherId;
          this.setTeacherData(teacherId);
        });
    }
  }

  deleteArticle(articleId: string): Promise<void> {
    return this.db
      .doc(`articles/${articleId}`)
      .delete()
      .then(() => {
        this.snackBar.open('記事を削除しました', null, { duration: 3000 });
      });
  }
}
