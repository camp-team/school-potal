import { Component, Inject, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/users';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-info-dialog',
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.scss'],
})
export class InfoDialogComponent implements OnInit {
  readonly MAX_NAME_LENGTH = 50;
  readonly MAX_BODY_LENGTH = 400;

  user$: Observable<User> = this.authService.user$;

  form = this.fb.group({
    name: [
      '',
      [Validators.required, Validators.maxLength(this.MAX_NAME_LENGTH)],
    ],
    email: ['', [Validators.required, Validators.email]],
    text: [
      '',
      [Validators.required, Validators.maxLength(this.MAX_BODY_LENGTH)],
    ],
  });

  get nameControl() {
    return this.form.get('name') as FormControl;
  }

  get emailControl() {
    return this.form.get('email') as FormControl;
  }

  get textControl() {
    return this.form.get('text') as FormControl;
  }

  constructor(
    private fb: FormBuilder,
    private func: AngularFireFunctions,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.form.patchValue({
        ...this.data,
      });
    }
  }

  submit(uid: string) {
    const formData = this.form.value;
    const callable = this.func.httpsCallable('sendEmailForAuthApply');
    callable({ ...formData, uid })
      .toPromise()
      .then(() => this.snackBar.open('メールを送信しました。'));
  }
}
