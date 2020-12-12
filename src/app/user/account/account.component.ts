import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, combineLatest } from 'rxjs';
import { switchMap, map, tap } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/interfaces/users';
import { SeoService } from 'src/app/services/seo.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  user$: Observable<User> = this.route.paramMap.pipe(
    switchMap((param) => {
      const profileId = param.get('uid');
      return this.userService.getUserData(profileId);
    }),
    tap((user) => {
      this.seoService.setTitleAndMeta(
        `${user.name} | eduu `,
        `${user.profile}`
      );
    })
  );

  uid$: Observable<string> = this.authService.user$.pipe(
    map((user) => {
      return user.uid;
    })
  );

  profileId$: Observable<string> = this.route.paramMap.pipe(
    map((param) => {
      return param.get('uid');
    })
  );

  isMypage$: Observable<boolean> = combineLatest([
    this.profileId$,
    this.uid$,
  ]).pipe(map(([profileId, uid]) => profileId === uid));

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private authService: AuthService,
    private seoService: SeoService
  ) {}

  ngOnInit(): void {}
}
