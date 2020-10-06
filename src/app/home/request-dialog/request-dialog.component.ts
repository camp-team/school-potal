import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/users';
import { AuthService } from 'src/app/services/auth.service';
import { RequestService } from 'src/app/services/request.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-request-dialog',
  templateUrl: './request-dialog.component.html',
  styleUrls: ['./request-dialog.component.scss'],
})
export class RequestDialogComponent implements OnInit {
  uid: string;
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
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  submit(uid: string) {
    console.log('check');

    this.isProcessing = true;
    const formData = this.form.value;
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
