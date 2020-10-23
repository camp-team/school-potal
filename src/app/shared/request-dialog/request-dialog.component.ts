import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/users';
import { AuthService } from 'src/app/services/auth.service';
import { RequestService } from 'src/app/services/request.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Request } from 'src/app/interfaces/request';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from 'src/app/interfaces/category';

@Component({
  selector: 'app-request-dialog',
  templateUrl: './request-dialog.component.html',
  styleUrls: ['./request-dialog.component.scss'],
})
export class RequestDialogComponent implements OnInit {
  readonly MAX_TITLE_LENGTH = 50;
  readonly MAX_BODY_LENGTH = 400;

  isProcessing: boolean;
  user$: Observable<User> = this.authService.user$;

  form = this.fb.group({
    title: [
      '',
      [Validators.required, Validators.maxLength(this.MAX_TITLE_LENGTH)],
    ],
    category: ['', [Validators.required]],
    body: [
      '',
      [Validators.required, Validators.maxLength(this.MAX_BODY_LENGTH)],
    ],
  });

  categoryGroup: Category[] = [
    { value: 'プログラミング', viewValue: 'プログラミング' },
    { value: '外国語', viewValue: '外国語' },
    { value: 'ビジネス', viewValue: 'ビジネス' },
    { value: 'スポーツ', viewValue: 'スポーツ' },
    { value: 'デザイン', viewValue: 'デザイン' },
    { value: '美容', viewValue: '美容' },
    { value: '料理', viewValue: '料理' },
    { value: 'モノづくり', viewValue: 'モノづくり' },
    { value: '音楽', viewValue: '音楽' },
    { value: '医療', viewValue: '医療' },
  ];

  get title(): FormControl {
    return this.form.get('title') as FormControl;
  }

  get category(): FormControl {
    return this.form.get('category') as FormControl;
  }

  get body(): FormControl {
    return this.form.get('body') as FormControl;
  }

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private requestService: RequestService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: Request
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.form.patchValue({
        title: this.data.title,
        body: this.data.body,
        category: this.data.category,
      });
    }
  }

  submit(uid: string) {
    this.isProcessing = true;
    const formData = this.form.value;
    if (this.data) {
      this.requestService
        .updateRequest({
          title: formData.title,
          body: formData.body,
          uid,
          id: this.data.id,
          createdAt: this.data.createdAt,
          category: this.data.category,
        })
        .then(() => this.snackBar.open('更新しました'))
        .then(() => (this.isProcessing = false));
    } else {
      this.requestService
        .createRequest({
          title: formData.title,
          body: formData.body,
          uid,
          category: formData.category,
        })
        .then(() => this.snackBar.open('投稿しました'))
        .then(() => (this.isProcessing = false));
    }
  }
}
