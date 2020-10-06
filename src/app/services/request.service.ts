import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase';
import { Request } from '../interfaces/request';
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
}
