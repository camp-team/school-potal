import { Component, OnInit } from '@angular/core';
import { DrawerService } from '../services/drawer.service';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { User } from '../interfaces/users';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  user$ = this.authService.user$;

  constructor(
    private drawerService: DrawerService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  toggle() {
    this.drawerService.toggle();
  }

  logout() {
    this.authService.logout();
  }
}
