import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../interfaces/users';
import { UiService } from '../services/ui.service';
import { MatDialog } from '@angular/material/dialog';
import { RequestDialogComponent } from '../shared/request-dialog/request-dialog.component';
import { InfoDialogComponent } from '../user/info-dialog/info-dialog.component';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  opened$: Observable<boolean> = this.uiService.isOpen$;
  user$: Observable<User> = this.userService.user$;

  constructor(
    private uiService: UiService,
    private router: Router,
    private userService: UserService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  routeCategoryFilter(category: string) {
    this.router.navigate(['/search'], {
      queryParamsHandling: 'merge',
      queryParams: { category },
    });
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
