import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  loadingSource = new Subject();
  loading$ = this.loadingSource.asObservable();
  loading: boolean;

  isOpenSource = new ReplaySubject<boolean>(1);
  isOpen$: Observable<boolean> = this.isOpenSource.asObservable();
  isOpened: boolean;

  constructor() {}

  toggleLoading(status: boolean) {
    this.loadingSource.next(status);
  }

  toggleOpening() {
    this.isOpened = !this.isOpened;
    this.isOpenSource.next(this.isOpened);
  }
}
