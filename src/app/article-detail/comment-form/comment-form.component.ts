import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CommentService } from 'src/app/services/comment.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map, tap, switchMap } from 'rxjs/operators';
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
  uId: string;

  user$: Observable<User> = this.authService.user$;

  articleId$: Observable<string> = this.route.paramMap.pipe(
    map((param) => {
      return param.get('articleId');
    }),
    tap((data) => console.log(data))
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
        this.uId = uid;
      });

    this.articleId$.subscribe((id) => (this.articleId = id));
  }

  isProcessing: boolean;

  ngOnInit(): void {}

  submit() {
    const formData = this.commentForm.value;
    console.log(formData);
    console.log(this.articleId);
    this.commentService
      .addComment({
        body: formData,
        uId: this.uId,
        articleId: this.articleId,
      })
      .then(() => {
        this.snackBar.open('コメントを投稿しました', null, { duration: 3000 });
      })
      .then(() => (this.isProcessing = false))
      .finally(() => this.commentForm.setValue(''));
  }
}
