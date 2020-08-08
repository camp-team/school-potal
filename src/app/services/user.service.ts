import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../interfaces/users';
import { Observable, of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  uId: string;

  user$: Observable<User> = this.afAuth.authState.pipe(
    switchMap((user) => {
      if (user) {
        this.uId = user.uid;
        return this.getUserData(this.uId);
      } else {
        return of(null);
      }
    })
  );

  constructor(private db: AngularFirestore, private afAuth: AngularFireAuth) {}

  getUserData(userId: string) {
    return this.db.doc<User>(`users/${userId}`).valueChanges();
  }
}
