import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
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
  uId: string;
  plan: string;
  profileId: string;

  user$: Observable<User> = this.route.paramMap.pipe(
    switchMap((param) => {
      const profileId = param.get('uid');
      return this.userService.getUserData(profileId);
    }),
    tap((user) => console.log(user))
  );

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {}
}
