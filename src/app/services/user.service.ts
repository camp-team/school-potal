import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../interfaces/users';
import { Observable, of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { firestore } from 'firebase';
import { Router } from '@angular/router';

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

  constructor(
    private db: AngularFirestore,
    private afAuth: AngularFireAuth,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  getUserData(uid: string) {
    return this.db.doc<User>(`users/${uid}`).valueChanges();
  }

  updateUser(
    user: Omit<User, 'photoURL' | 'createdAt' | 'isAdmin' | 'plan' | 'email'>
  ) {
    return this.db
      .doc<User>(`users/${user.uid}`)
      .update({
        ...user,
        updatedAt: firestore.Timestamp.now(),
      })
      .then(() => {
        this.snackBar.open('ユーザー情報を更新しました');
        this.router.navigate(['/user', `${user.uid}`]);
      });
  }

  deleteUser(user: User) {
    return this.db
      .doc(`users/${user.uid}`)
      .delete()
      .then(() => {
        this.snackBar.open('アカウントを削除しました');
      });
  }
}
