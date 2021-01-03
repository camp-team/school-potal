import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../interfaces/users';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isProcessing: boolean;

  user$: Observable<User> = this.afAuth.authState.pipe(
    switchMap((afUser) => {
      if (afUser) {
        return this.db.doc<User>(`users/${afUser.uid}`).valueChanges();
      } else {
        return of(null);
      }
    })
  );

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  async googleLogin() {
    this.isProcessing = true;
    const provider = new auth.GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    this.afAuth
      .signInWithPopup(provider)
      .then(() => {
        this.succeededLogin();
      })
      .catch((error) => {
        this.failedLogin(error);
      });
  }

  async twitterLogin() {
    this.isProcessing = true;
    const provider = new auth.TwitterAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    this.afAuth
      .signInWithPopup(provider)
      .then(() => {
        this.succeededLogin();
      })
      .catch((error) => {
        this.failedLogin(error);
      });
  }

  private succeededLogin() {
    this.router.navigateByUrl('/');
    this.snackBar.open('ログインしました🎉');
    this.isProcessing = false;
  }

  private failedLogin(error: { message: any }) {
    this.isProcessing = false;
    console.error(error.message);
    this.snackBar.open('ログインエラーです。数秒後にもう一度お試しください。');
  }

  logout() {
    this.afAuth.signOut().then(() => {
      this.snackBar.open('ログアウトしました 🚪');
    });
    this.router.navigateByUrl('/');
  }
}
