import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { User } from '../interfaces/users';
import { MatDialog } from '@angular/material/dialog';
import { SearchDialogComponent } from '../search-dialog/search-dialog.component';
import { UiService } from '../services/ui.service';
import { RequestDialogComponent } from '../shared/request-dialog/request-dialog.component';

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

  openSearchDialog() {
    this.dialog
      .open(SearchDialogComponent, {
        maxWidth: '100vw',
        minWidth: '30%',
        autoFocus: false,
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
