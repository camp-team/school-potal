import { Component, OnInit, Input } from '@angular/core';
import { CommentService } from 'src/app/services/comment.service';
import { Observable } from 'rxjs';
import { CommentWithUser } from 'src/app/interfaces/comment';
import { User } from 'src/app/interfaces/users';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, Validators } from '@angular/forms';
import { firestore } from 'firebase';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss'],
})
export class CommentListComponent implements OnInit {
  @Input() comment: CommentWithUser;

  user$: Observable<User> = this.authService.user$;

  commentForm = new FormControl('', [
    Validators.maxLength(400),
    Validators.required,
  ]);

  isEditable: boolean;

  constructor(
    private commentService: CommentService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  isEditMode() {
    this.isEditable = true;
    this.commentForm.setValue(this.comment.body);
  }

  updateComment() {
    this.commentService
      .updateComment({
        body: this.commentForm.value,
        uid: this.comment.uid,
        articleId: this.comment.articleId,
        id: this.comment.id,
        updatedAt: firestore.Timestamp.now(),
      })
      .then(() => {
        this.snackBar.open('コメントを更新しました');
      });
  }

  openDeleteDialog() {
    this.dialog
      .open(DeleteDialogComponent)
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.commentService
            .deleteComment(this.comment)
            .then(() => this.snackBar.open('コメントを削除しました'));
        } else {
          return;
        }
      });
  }

  ngOnInit(): void {}
}
