import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Request, RequestWithUser } from 'src/app/interfaces/request';
import { RequestComment } from 'src/app/interfaces/request-comment';
import { User } from 'src/app/interfaces/users';
import { AuthService } from 'src/app/services/auth.service';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-all-request',
  templateUrl: './all-request.component.html',
  styleUrls: ['./all-request.component.scss'],
})
export class AllRequestComponent implements OnInit, OnDestroy {
  subscriptions: Subscription = new Subscription();
  user: User;
  isloading: boolean;
  isComplete: boolean;
  lastDoc: any;
  requests: Request[] = [];

  requests$: Observable<
    RequestWithUser[]
  > = this.requestService.getRequestsWithUser();

  user$: Observable<User> = this.authService.user$;

  constructor(
    private requestService: RequestService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.user$.subscribe((user) => {
        this.user = user;
      })
    );
    this.getRequestsLimited();
  }

  getRequestsLimited() {
    this.isloading = true;
    if (this.isComplete) {
      this.isloading = false;
      console.log('complete');

      return;
    }
    this.isloading = true;
    this.requestService.getRequestsWithUser().subscribe((requests) => {
      if (requests) {
        if (!requests.length) {
          this.isComplete = true;
          this.isloading = false;
          console.log('no-length');

          return;
        }
        this.lastDoc = requests[requests.length - 1];
        const requestData = requests.forEach((doc) => doc);
        this.requests.push(...requests);
        console.log('push');

        this.isloading = false;
      } else {
        this.isComplete = true;
        this.isloading = true;
      }
    });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
