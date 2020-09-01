import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DrawerService {
  isOpenSource = new ReplaySubject<boolean>(1);
  isOpen$: Observable<boolean> = this.isOpenSource.asObservable();
  isOpened: boolean;

  constructor() {}

  toggle() {
    this.isOpened = !this.isOpened;
    this.isOpenSource.next(this.isOpened);
  }
}
