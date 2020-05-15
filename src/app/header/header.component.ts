import { Component, OnInit } from '@angular/core';
import { DrawerService } from '../services/drawer.service';
import { AuthService } from '../sevices/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  user$ = this.authService.afUser$;

  constructor(
    private drawerService: DrawerService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  toggle() {
    this.drawerService.toggle();
  }

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
  }
}
