import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { tap } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  userId: string;
  isUser: boolean;
  user$ = this.authService.user$.pipe(
    tap((user) => {
      this.isUser = true;
      if (user) {
        this.userService.getUserData(user.uid).subscribe(() => {
          this.userService.createUserWithTwitterData(user.uid);
          console.log(user);
        });
      }
    })
  );

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {}

  googleLogin() {
    this.authService.googleLogin();
  }

  twitterLogin() {
    this.authService.twitterLogin();
  }
}
