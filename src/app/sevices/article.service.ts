import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Article } from '../interfaces/article';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage
  ) {}

  // 記事とidに紐付いた画像オブジェクトを作成
  async createArtile(
    article: Omit<Article, 'id'>,
    images: {
      thumbnailURL: File;
      logo: File;
      image1?: File;
      image2?: File;
    }
  ) {
    const id = this.db.createId();
    const urls = await Promise.all(
      Object.values(images).map(async (file) => {
        if (file) {
          return await this.uploadImage(id, file);
        } else {
          return null;
        }
      })
    );
    const [thumbnailURL, logo, image1, image2] = urls;
    return this.db.doc<Article>(`articles/${id}`).set({
      ...article,
      id,
      thumbnailURL,
      logo,
      image1,
      image2,
    });
  }

  // 記事のidに画像を紐付ける
  async uploadImage(articleId: string, file: File): Promise<string> {
    const result = await this.storage.ref(`articles/${articleId}`).put(file);
    return await result.ref.getDownloadURL();
  }

  // DBから記事データ（オブジェクト）を持ってくる
  getArticle(articleId: string): Observable<Article> {
    return this.db.doc<Article>(`articles/${articleId}`).valueChanges();
  }
}
