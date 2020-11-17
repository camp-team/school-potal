import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Article } from 'src/app/interfaces/article';
import { CommentService } from 'src/app/services/comment.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-review-dialog',
  templateUrl: './review-dialog.component.html',
  styleUrls: ['./review-dialog.component.scss'],
})
export class ReviewDialogComponent implements OnInit {
  readonly MAX_COMMENT_LENGTH = 400;

  isProcessing: boolean;
  ratings = [
    {
      value: 1,
      viewValue: '⭐️',
    },
    {
      value: 2,
      viewValue: '⭐️⭐️',
    },
    {
      value: 3,
      viewValue: '⭐️⭐️⭐️',
    },
    {
      value: 4,
      viewValue: '⭐️⭐️⭐️⭐️',
    },
    {
      value: 5,
      viewValue: '⭐️⭐️⭐️⭐️⭐️',
    },
  ];

  form = this.fb.group({
    rating: ['', [Validators.required]],
    comment: [
      '',
      [Validators.required, Validators.maxLength(this.MAX_COMMENT_LENGTH)],
    ],
  });

  get ratingControl() {
    return this.form.get('rating') as FormControl;
  }

  get commentControl() {
    return this.form.get('comment') as FormControl;
  }

  constructor(
    private userService: UserService,
    private commentService: CommentService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      article: Article;
      uid: string;
    }
  ) {}

  ngOnInit(): void {}

  submit() {
    console.log('submit');

    this.isProcessing = true;
    const formData = this.form.value;
    this.commentService
      .addComment({
        comment: formData.comment,
        rating: formData.rating,
        uid: this.data.uid,
        articleId: this.data.article.id,
      })
      .then(() => this.snackBar.open('投稿しました'))
      .then(() => console.log('finish'))
      .finally(() => (this.isProcessing = false));
  }

  joinAsStudent(uid: string) {
    this.userService.joinAsStudent(this.data.article.id, uid);
  }
}
