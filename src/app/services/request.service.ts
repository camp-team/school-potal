import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase';
import { combineLatest, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Request, RequestWithUser } from '../interfaces/request';
import { User } from '../interfaces/users';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  constructor(private db: AngularFirestore, private userService: UserService) {}

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

  deleteRequest(request: Request): Promise<void> {
    return this.db.doc<Request>(`requests/${request.id}`).delete();
  }

  getRequestsWithUser(): Observable<RequestWithUser[]> {
    return this.db
      .collection<Request>(`requests`, (ref) =>
        ref.orderBy('createdAt', 'desc').limit(30)
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
}
