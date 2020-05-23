import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Article } from '../interfaces/article';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage,
    private snackBar: MatSnackBar
  ) {}

  // 記事作成メソッド
  async createArtile(
    article: Omit<Article, 'id'>,
    images: {
      thumbnail: File;
      logo: File;
      image1?: File;
      image2?: File;
    }
  ) {
    const id = this.db.createId();
    const urls = await Promise.all(
      Object.entries(images).map(async ([key, file]) => {
        if (file) {
          return await this.uploadImage(id, file);
        } else {
          return null;
        }
      })
    );
    const [thumbnail, logo, image1, image2] = urls;
    return this.db.doc(`articles/${id}`).set({
      ...article,
      thumbnail,
      logo,
      image1,
      image2,
    });
  }

  // 記事のidに画像を紐付けるメソッド
  async uploadImage(articleId: string, file: File): Promise<string> {
    const result = await this.storage.ref(`articles/${articleId}`).put(file);
    return await result.ref.getDownloadURL();
  }
}
