import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { User } from '../interfaces/users';
import { MatDialog } from '@angular/material/dialog';
import { UiService } from '../services/ui.service';
import { RequestDialogComponent } from '../shared/request-dialog/request-dialog.component';
import { InfoDialogComponent } from '../user/info-dialog/info-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  user$: Observable<User> = this.authService.user$;

  constructor(
    private uiService: UiService,
    private dialog: MatDialog,
    public authService: AuthService
  ) {}

  ngOnInit(): void {}

  toggleNav() {
    this.uiService.toggleOpening();
  }

  logout() {
    this.authService.logout();
  }

  openInfoDialog(user: User) {
    this.dialog
      .open(InfoDialogComponent, {
        maxWidth: '100vw',
        minWidth: '30%',
        data: { ...user },
      })
      .afterClosed();
  }

  openRequestDialog() {
    this.dialog
      .open(RequestDialogComponent, {
        maxWidth: '100vw',
        minWidth: '30%',
        autoFocus: false,
      })
      .afterClosed();
  }
}
