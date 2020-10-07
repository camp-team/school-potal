import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/interfaces/users';
import { AuthService } from 'src/app/services/auth.service';

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
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  submit() {}
}
