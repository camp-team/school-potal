import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
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
  uId: string;
  profileId: string;

  user$: Observable<User> = this.route.paramMap.pipe(
    switchMap((param) => {
      const profileId = param.get('uid');
      return this.userService.getUserData(profileId);
    })
  );

  profileId$: Observable<string> = this.route.paramMap.pipe(
    map((param) => {
      return param.get('uid');
    })
  );

  isMypage: boolean;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private authService: AuthService
  ) {
    this.authService.user$.subscribe((user) => {
      this.profileId$.subscribe((uid) => (this.profileId = uid));
      this.isMypage = this.userService.isEditable(user.uid, this.profileId);
    });
  }

  ngOnInit(): void {}
}
