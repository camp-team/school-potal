import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CommentService } from 'src/app/services/comment.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/interfaces/users';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Comment } from 'src/app/interfaces/comment';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss'],
})
export class CommentFormComponent implements OnInit {
  commentForm = new FormControl('', [
    Validators.maxLength(400),
    Validators.required,
  ]);

  articleId: string;
  uid: string;

  user$: Observable<User> = this.authService.user$;

  articleId$: Observable<string> = this.route.paramMap.pipe(
    map((param) => {
      return param.get('articleId');
    })
  );

  comments$: Observable<Comment[]> = this.articleId$.pipe(
    switchMap((id) => {
      return this.commentService.getCommentsByArticleId(id);
    })
  );

  constructor(
    private commentService: CommentService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.authService.user$
      .pipe(
        map((user) => {
          return user.uid;
        })
      )
      .subscribe((uid) => {
        this.uid = uid;
      });

    this.articleId$.subscribe((id) => (this.articleId = id));
  }

  isProcessing: boolean;

  ngOnInit(): void {}

  submit() {
    const formData = this.commentForm.value;
    this.commentService
      .addComment({
        body: formData,
        uid: this.uid,
        articleId: this.articleId,
      })
      .then(() => {
        this.snackBar.open('コメントを投稿しました', null, { duration: 3000 });
      })
      .then(() => (this.isProcessing = false))
      .then(() => this.commentForm[''])
      .finally(() => this.commentForm.reset(null));
  }
}
