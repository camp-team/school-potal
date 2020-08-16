import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, combineLatest } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { switchMap, map, tap } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/interfaces/users';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  myId: string;
  profileId: string;

  user$: Observable<User> = this.route.paramMap.pipe(
    switchMap((param) => {
      const profileId = param.get('uid');
      return this.userService.getUserData(profileId);
    }),
    tap((user) => console.log(user))
  );

  myId$: Observable<string> = this.user$.pipe(
    map((user) => {
      return user.uid;
    }),
    tap((uid) => console.log(uid))
  );

  profileId$: Observable<string> = this.route.paramMap.pipe(
    map((param) => {
      return param.get('uid');
    }),
    tap((uid) => console.log(uid))
  );

  isMypage: boolean = !!(this.myId === this.profileId);

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private authService: AuthService
  ) {
    this.myId$.subscribe((uid) => (this.myId = uid));
    this.profileId$.subscribe((uid) => (this.profileId = uid));
    console.log(this.profileId);
  }

  ngOnInit(): void {}
}
