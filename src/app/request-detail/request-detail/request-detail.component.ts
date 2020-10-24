import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { RequestDialogComponent } from 'src/app/shared/request-dialog/request-dialog.component';
import { Request, RequestWithUser } from 'src/app/interfaces/request';
import { User } from 'src/app/interfaces/users';
import { AuthService } from 'src/app/services/auth.service';
import { RequestService } from 'src/app/services/request.service';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';
import { fade } from 'src/app/animations';
import { RequestCommentWithUser } from 'src/app/interfaces/request-comment';

@Component({
  selector: 'app-request-detail',
  templateUrl: './request-detail.component.html',
  styleUrls: ['./request-detail.component.scss'],
  animations: [fade],
})
export class RequestDetailComponent implements OnInit {
  requestId: string;
  request: Request;

  user$: Observable<User> = this.authservice.user$;

  requestId$: Observable<string> = this.route.paramMap.pipe(
    map((param) => {
      return param.get('id');
    })
  );

  request$: Observable<RequestWithUser> = this.route.paramMap.pipe(
    switchMap((param) => {
      const id = param.get('id');
      return this.requestService.getRequestWithUserById(id);
    })
  );

  comments$: Observable<RequestCommentWithUser[]> = this.requestId$.pipe(
    switchMap((id) => {
      return this.requestService.getCommentsWithUserById(id);
    })
  );

  constructor(
    private authservice: AuthService,
    private route: ActivatedRoute,
    private requestService: RequestService,
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
          this.requestService.deleteRequest(request);
        } else {
          return;
        }
      });
  }
}
