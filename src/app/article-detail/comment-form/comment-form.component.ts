import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CommentService } from 'src/app/services/comment.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/interfaces/users';
import { MatSnackBar } from '@angular/material/snack-bar';

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

    this.route.paramMap
      .pipe(
        map((param) => {
          return param.get('articleId');
        }),
        tap((articleId) => console.log(articleId))
      )
      .subscribe((id) => {
        this.articleId = id;
      });
  }

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
      });
  }
}
