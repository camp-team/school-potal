import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/interfaces/users';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
})
export class SettingComponent implements OnInit {
  user$: Observable<User> = this.authService.user$;

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  form = this.fb.group({
    name: ['', Validators.maxLength(50)],
    profile: ['', Validators.maxLength(400)],
    link: ['', Validators.maxLength(400)],
    joins: ['', Validators.maxLength(50)],
  });

  get name(): FormControl {
    return this.form.get('name') as FormControl;
  }
  get profile(): FormControl {
    return this.form.get('profile') as FormControl;
  }
  get link(): FormControl {
    return this.form.get('link') as FormControl;
  }
  get joins(): FormControl {
    return this.form.get('joins') as FormControl;
  }

  ngOnInit(): void {
    this.user$.subscribe((user) => this.form.patchValue(user));
  }

  submit() {}
}
