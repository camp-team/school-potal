import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { fade } from 'src/app/animations';
import { RequestWithUser } from 'src/app/interfaces/request';
import { User } from 'src/app/interfaces/users';
import { AuthService } from 'src/app/services/auth.service';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-all-request',
  templateUrl: './all-request.component.html',
  styleUrls: ['./all-request.component.scss'],
  animations: [fade],
})
export class AllRequestComponent implements OnInit, OnDestroy {
  subscriptions: Subscription = new Subscription();
  user: User;
  isloading: boolean;
  isComplete: boolean;
  lastDoc: RequestWithUser;
  requests: RequestWithUser[] = [];

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
    this.requests$.subscribe((requests) => {
      this.requests = requests;
    });
    this.getRequestsLimited();
  }

  getRequestsLimited() {
    this.isloading = true;
    if (this.isComplete) {
      this.isloading = false;
      return;
    }
    this.requestService
      .getRequestsWithUserLimited(this.lastDoc)
      .pipe(take(1))
      .subscribe((requests) => {
        if (requests) {
          if (!requests.length) {
            this.isComplete = true;
            this.isloading = false;
            return;
          }
          this.lastDoc = requests[requests.length - 1];
          this.requests.push(...requests);
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
