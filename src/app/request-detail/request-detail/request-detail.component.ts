import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { RequestDialogComponent } from 'src/app/shared/request-dialog/request-dialog.component';
import { Request, RequestWithUser } from 'src/app/interfaces/request';
import { User } from 'src/app/interfaces/users';
import { AuthService } from 'src/app/services/auth.service';
import { RequestService } from 'src/app/services/request.service';
import { UserService } from 'src/app/services/user.service';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-request-detail',
  templateUrl: './request-detail.component.html',
  styleUrls: ['./request-detail.component.scss'],
})
export class RequestDetailComponent implements OnInit {
  requestId: string;
  request: Request;
  uid: string;

  user$: Observable<User> = this.authservice.user$;

  request$: Observable<RequestWithUser> = this.route.paramMap.pipe(
    switchMap((param) => {
      const id = param.get('id');
      return this.requestService.getRequestWithUserById(id);
    })
  );

  constructor(
    private authservice: AuthService,
    private route: ActivatedRoute,
    private requestService: RequestService,
    private userService: UserService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  openRequestDialog(request: Request) {
    this.dialog
      .open(RequestDialogComponent, {
        maxWidth: '100vw',
        minWidth: '30%',
        autoFocus: false,
        data: { ...request },
      })
      .afterClosed();
  }

  openDeleteDialog(request: Request) {
    this.dialog
      .open(DeleteDialogComponent, {
        maxWidth: '100vw',
        minWidth: '30%',
        autoFocus: false,
        data: { ...request },
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.requestService.deleteRequest(result.id);
        } else {
          return;
        }
      });
  }
}
