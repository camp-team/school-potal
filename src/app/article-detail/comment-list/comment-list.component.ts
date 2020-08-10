import { Component, OnInit, Input } from '@angular/core';
import { CommentService } from 'src/app/services/comment.service';
import { Observable } from 'rxjs';
import { CommentWithUser } from 'src/app/interfaces/comment';
import { User } from 'src/app/interfaces/users';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss'],
})
export class CommentListComponent implements OnInit {
  @Input() comment: CommentWithUser;

  user$: Observable<User> = this.authService.user$;

  constructor(
    private commentService: CommentService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  deleteComment(): void {
    this.commentService
      .deleteComment(this.comment)
      .then(() =>
        this.snackBar.open('コメントを削除しました', null, { duration: 3000 })
      );
  }

  ngOnInit(): void {}
}
