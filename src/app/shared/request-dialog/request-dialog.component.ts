import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/users';
import { AuthService } from 'src/app/services/auth.service';
import { RequestService } from 'src/app/services/request.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Request } from 'src/app/interfaces/request';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-request-dialog',
  templateUrl: './request-dialog.component.html',
  styleUrls: ['./request-dialog.component.scss'],
})
export class RequestDialogComponent implements OnInit {
  user$: Observable<User> = this.authService.user$;
  isProcessing: boolean;

  form = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(50)]],
    body: ['', [Validators.required, Validators.maxLength(400)]],
  });

  get title(): FormControl {
    return this.form.get('title') as FormControl;
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
        })
        .then(() => this.snackBar.open('更新しました'))
        .then(() => (this.isProcessing = false));
    } else {
      this.requestService
        .createRequest({
          title: formData.title,
          body: formData.body,
          uid,
        })
        .then(() => this.snackBar.open('投稿しました'))
        .then(() => (this.isProcessing = false));
    }
  }
}
