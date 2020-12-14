import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../interfaces/users';
import { combineLatest, Observable, of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { map, switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { firestore } from 'firebase';
import { Router } from '@angular/router';
import { Student, StudentWithUser } from '../interfaces/student';

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

  async updateUser(
    user: Omit<User, 'photoURL' | 'createdAt' | 'isAdmin' | 'plan' | 'email'>
  ) {
    await this.db.doc<User>(`users/${user.uid}`).update({
      ...user,
      updatedAt: firestore.Timestamp.now(),
    });
    this.snackBar.open('ユーザー情報を更新しました');
    this.router.navigate(['/user', `${user.uid}`]);
  }

  async deleteUser(user: User): Promise<void> {
    await this.db.doc(`users/${user.uid}`).delete();
    this.snackBar.open('アカウントを削除しました');
    this.router.navigateByUrl('/');
  }

  joinAsStudent(articleId: string, uid: string) {
    this.db
      .doc(`articles/${articleId}/students/${uid}`)
      .set({
        articleId,
        uid,
      })
      .then(() => {
        this.snackBar.open('参加済みユーザーとして登録しました');
        this.router.navigate(['/article-detail', `${articleId}`]);
      });
  }

  getStudents(articleId: string) {
    return this.db
      .collection<Student>(`articles/${articleId}/students`)
      .valueChanges();
  }

  getStudentsWithUser(articleId: string): Observable<StudentWithUser[]> {
    return this.db
      .collection<Student>(`articles/${articleId}/students`)
      .valueChanges()
      .pipe(
        switchMap((students: Student[]) => {
          if (students?.length) {
            const unduplicatedUids: string[] = Array.from(
              new Set(students.map((student) => student.uid))
            );
            const users$: Observable<User[]> = combineLatest(
              unduplicatedUids.map((uid) => this.getUserData(uid))
            );
            return combineLatest([of(students), users$]);
          } else {
            return of([]);
          }
        }),
        map(([students, users]) => {
          if (students?.length) {
            return students.map((student: Student) => {
              return {
                ...student,
                user: users.find((user: User) => student.uid === user?.uid),
              };
            });
          } else {
            return [];
          }
        })
      );
  }
}
