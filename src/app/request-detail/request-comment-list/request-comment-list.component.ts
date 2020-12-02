import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { firestore } from 'firebase';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Request, RequestWithUser } from 'src/app/interfaces/request';
import { RequestCommentWithUser } from 'src/app/interfaces/request-comment';
import { User } from 'src/app/interfaces/users';
import { AuthService } from 'src/app/services/auth.service';
import { RequestService } from 'src/app/services/request.service';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-request-comment-list',
  templateUrl: './request-comment-list.component.html',
  styleUrls: ['./request-comment-list.component.scss'],
})
export class RequestCommentListComponent implements OnInit {
  @Input() comment: RequestCommentWithUser;
  isEditable: boolean;

  readonly MAX_COMMENT_LENGTH = 400;

  commentForm = new FormControl('', [
    Validators.maxLength(this.MAX_COMMENT_LENGTH),
    Validators.required,
  ]);

  user$: Observable<User> = this.authService.user$;

  constructor(
    private requestService: RequestService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  isEditMode() {
    this.isEditable = true;
    this.commentForm.setValue(this.comment.body);
  }

  updateComment() {
    this.requestService
      .updateComment({
        uid: this.comment.uid,
        id: this.comment.id,
        requestId: this.comment.requestId,
        body: this.commentForm.value,
        updatedAt: firestore.Timestamp.now(),
      })
      .then(() => this.snackBar.open('コメントを更新しました'));
  }

  openDeleteDialog() {
    this.dialog
      .open(DeleteDialogComponent)
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.requestService
            .deleteComment(this.comment)
            .then(() => this.snackBar.open('コメントを削除しました'));
        } else {
          return;
        }
      });
  }
}
