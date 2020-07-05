import { Component, OnInit } from '@angular/core';
import { DrawerService } from '../services/drawer.service';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { User } from '../interfaces/users';
import { UserService } from '../services/user.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  user$ = this.authService.user$.pipe(
    tap((user) => {
      if (user) {
        this.userService.getUserData(user.uid).subscribe(() => {
          this.userService.createUserWithTwitterData(user.uid);
          console.log(user);
        });
      }
    })
  );

  constructor(
    private drawerService: DrawerService,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {}

  toggle() {
    this.drawerService.toggle();
  }

  logout() {
    this.authService.logout();
  }
}
