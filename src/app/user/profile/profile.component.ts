import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/interfaces/users';
import { ActivatedRoute } from '@angular/router';
import { switchMap, map, tap } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user$: Observable<User> = this.route.paramMap.pipe(
    switchMap((param) => {
      const profileId = param.get('uid');
      return this.userService.getUserData(profileId);
    }),
    tap((user) => console.log(user))
  );

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {}
}
