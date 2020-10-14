import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/users';
import { SearchDialogComponent } from 'src/app/search-dialog/search-dialog.component';
import { AuthService } from 'src/app/services/auth.service';
import { RequestDialogComponent } from 'src/app/shared/request-dialog/request-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  user$: Observable<User> = this.authService.user$;

  constructor(private dialog: MatDialog, private authService: AuthService) {}

  ngOnInit(): void {}

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
