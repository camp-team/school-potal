import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../interfaces/users';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) {}

  async createUserWithTwitterData(userId: string): Promise<any> {
    this.db
      .doc(`users/&{userId}`)
      .get()
      .subscribe(async (doc) => {
        if (!doc.exists) {
          return this.afAuth.getRedirectResult().then(async (result) => {
            const uid = result.user.providerData[0].uid;
            const { accessToken, secret } = result.credential as any;
            return this.db
              .doc(`users/${userId}/private/twitter`)
              .set({
                uid,
                accessToken,
                secret,
              })
              .then(() => {
                return true;
              });
          });
        }
      });
  }

  getUserData(userId: string) {
    return this.db.doc<User>(`users/${userId}`).valueChanges();
  }
}
