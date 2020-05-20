import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Article } from '../interfaces/article';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  id = this.db.createId();

  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage,
    private snackBar: MatSnackBar
  ) {}

  createArtile(article: Article) {
    return this.db
      .doc(`articles/${this.id}`)
      .set(article)
      .then(() => {
        this.snackBar.open('記事を投稿しました！', null, {
          duration: 3000,
        });
      });
  }
}

// async selectImages(){
//   const ref = this.Storage.ref();
//   const result = await ref.putString();
//   return result.ref.getDownloadURL();
// }

// selectImages(id: string, files: File[]):Promise<void> {
//   return Promise.all(
//     files.map((file, index) => {
//       const ref = this.Storage.ref(`posts/${id}-${index}`);
//       return ref.put(file);
//     })
//   ).then(async task => {
//     const imageURLs = [];
//     for (const task of tasks) {
//       imageURLs.push(await task.ref.getDownloadURL());
//     }
//     return this.db.doc(`posts/${id}`).update({
//       imageURLs
//     });
//   });
// }
