import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/interfaces/users';
import { AuthService } from 'src/app/services/auth.service';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-request-comment-form',
  templateUrl: './request-comment-form.component.html',
  styleUrls: ['./request-comment-form.component.scss'],
})
export class RequestCommentFormComponent implements OnInit {
  uid: string;
  requestId: string;
  isProcessing: boolean;

  commentForm = new FormControl('', [
    Validators.required,
    Validators.maxLength(400),
  ]);

  user$: Observable<User> = this.authService.user$;

  requestId$: Observable<string> = this.route.paramMap.pipe(
    map((param) => {
      return param.get('id');
    })
  );

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private requestService: RequestService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.user$
      .pipe(
        map((user) => {
          return user?.uid;
        })
      )
      .subscribe((uid) => {
        this.uid = uid;
      });

    this.requestId$.subscribe((id) => (this.requestId = id));
  }

  submit() {
    const formData = this.commentForm.value;
    this.requestService
      .addComment({
        uid: this.uid,
        body: formData,
        requestId: this.requestId,
      })
      .then(() => this.snackBar.open('コメントしました'))
      .then(() => (this.isProcessing = false))
      .then(() => this.commentForm.setValue(''));
  }
}
