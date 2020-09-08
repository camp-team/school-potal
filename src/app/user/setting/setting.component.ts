import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/interfaces/users';
import {
  FormBuilder,
  FormControl,
  Validators,
  FormGroup,
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { MatChipInputEvent } from '@angular/material/chips';
import { UserService } from 'src/app/services/user.service';
import { firestore } from 'firebase';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
})
export class SettingComponent implements OnInit {
  user: User;
  user$: Observable<User> = this.authService.user$;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private dialog: MatDialog
  ) {
    this.user$.subscribe((user) => {
      this.user = user;
    });
  }

  form: FormGroup = this.fb.group({
    name: ['', Validators.maxLength(50)],
    profile: ['', Validators.maxLength(400)],
    links: ['', Validators.maxLength(400)],
    tags: [['']],
  });

  get nameControl(): FormControl {
    return this.form.get('name') as FormControl;
  }
  get profileControl(): FormControl {
    return this.form.get('profile') as FormControl;
  }
  get linksControl(): FormControl {
    return this.form.get('links') as FormControl;
  }
  get tagsControl(): FormControl {
    return this.form.get('tags') as FormControl;
  }

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  tags: string[] = [];

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.tags.push(value.trim());
    }

    if (input) {
      input.value = '';
    }
  }

  remove(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  ngOnInit(): void {
    this.user$.subscribe((user) => {
      this.tags = user.tags;
      this.form.patchValue({
        ...user,
        tags: null,
      });
    });
  }

  updateUser() {
    const formData = this.form.value;
    this.userService.updateUser({
      name: formData.name,
      updatedAt: firestore.Timestamp.now(),
      profile: formData.profile,
      links: formData.links,
      tags: this.tags,
      uid: this.user.uid,
      pinnedArticleIds: this.user.pinnedArticleIds,
    });
  }

  openDeleteDialod() {
    this.dialog
      .open(DeleteDialogComponent, {
        data: { title: '退会しますか？' },
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.userService.deleteUser(this.user);
        } else {
          return;
        }
      });
  }
}
