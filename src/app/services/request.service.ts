import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase';
import { combineLatest, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Request, RequestWithUser } from '../interfaces/request';
import { User } from '../interfaces/users';
import {
  RequestComment,
  RequestCommentWithUser,
} from '../interfaces/request-comment';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  constructor(
    private db: AngularFirestore,
    private userService: UserService,
    private router: Router
  ) {}

  createRequest(request: Omit<Request, 'id' | 'createdAt'>): Promise<void> {
    const id = this.db.createId();
    const value: Request = {
      ...request,
      id,
      createdAt: firestore.Timestamp.now(),
    };
    return this.db.doc<Request>(`requests/${id}`).set(value);
  }

  updateRequest(request: Request): Promise<void> {
    return this.db.doc<Request>(`requests/${request.id}`).update({
      ...request,
    });
  }

  async deleteRequest(request: Request): Promise<boolean | void> {
    return this.db
      .doc<Request>(`requests/${request.id}`)
      .delete()
      .then(() => this.router.navigateByUrl('/'));
  }

  getRequest(id: string): Observable<Request> {
    return this.db.doc<Request>(`requests/${id}`).valueChanges();
  }

  getRequestWithUserById(id: string): Observable<RequestWithUser> {
    return this.db
      .doc<Request>(`requests/${id}`)
      .valueChanges()
      .pipe(
        switchMap((request: Request) => {
          if (request) {
            const user$: Observable<User> = this.userService.getUserData(
              request.uid
            );
            return combineLatest([of(request), user$]);
          } else {
            return of(null);
          }
        }),
        map(([request, user]) => {
          if (request && user) {
            const result: RequestWithUser = {
              ...request,
              user,
            };
            return result;
          } else {
            return null;
          }
        })
      );
  }

  getRequestsWithUser(): Observable<RequestWithUser[]> {
    return this.db
      .collection<Request>(`requests`, (ref) =>
        ref.orderBy('createdAt', 'desc')
      )
      .valueChanges()
      .pipe(
        switchMap((requests: Request[]) => {
          if (requests.length) {
            const unduplicatedUids: string[] = Array.from(
              new Set(requests.map((request) => request.uid))
            );
            const users$: Observable<User[]> = combineLatest(
              unduplicatedUids.map((uid) => this.userService.getUserData(uid))
            );
            return combineLatest([of(requests), users$]);
          } else {
            return of([]);
          }
        }),
        map(([requests, users]) => {
          if (requests?.length) {
            return requests.map((request: Request) => {
              return {
                ...request,
                user: users.find((user: User) => request.uid === user?.uid),
              };
            });
          } else {
            return [];
          }
        })
      );
  }

  addComment(comment: Omit<RequestComment, 'id' | 'updatedAt'>): Promise<void> {
    const id = this.db.createId();
    const value: RequestComment = {
      ...comment,
      id,
      updatedAt: firestore.Timestamp.now(),
    };
    return this.db
      .doc<RequestComment>(
        `requests/${comment.requestId}/requestComments/${value.id}`
      )
      .set(value);
  }

  getCommentsById(requestId: string): Observable<RequestComment[]> {
    return this.db
      .collection<RequestComment>(
        `requests/${requestId}/requestComments`,
        (ref) => ref.orderBy('updatedAt', 'desc')
      )
      .valueChanges();
  }

  getCommentsWithUserById(
    requestId: string
  ): Observable<RequestCommentWithUser[]> {
    if (requestId === undefined) {
      return of(null);
    } else {
      return this.getCommentsById(requestId).pipe(
        switchMap((requestComments: RequestComment[]) => {
          if (requestComments.length) {
            const unduplicatedUids: string[] = Array.from(
              new Set(requestComments.map((comment) => comment.uid))
            );
            const users$: Observable<User[]> = combineLatest(
              unduplicatedUids.map((uid) => this.userService.getUserData(uid))
            );
            return combineLatest([of(requestComments), users$]);
          } else {
            return of([]);
          }
        }),
        map(([requestComments, users]) => {
          if (requestComments?.length) {
            return requestComments.map((comment: RequestComment) => {
              return {
                ...comment,
                user: users.find((user: User) => comment.uid === user?.uid),
              };
            });
          } else {
            return [];
          }
        })
      );
    }
  }

  updateComment(comment: RequestComment): Promise<void> {
    return this.db
      .doc<RequestComment>(
        `requests/${comment.requestId}/requestComments/${comment.id}`
      )
      .update({
        ...comment,
        updatedAt: firestore.Timestamp.now(),
      });
  }

  deleteComment(comment: RequestComment): Promise<void> {
    return this.db
      .doc<RequestComment>(
        `requests/${comment.requestId}/requestComments/${comment.id}`
      )
      .delete();
  }
}
