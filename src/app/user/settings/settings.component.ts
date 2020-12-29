import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
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
import { fade } from 'src/app/animations';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  animations: [fade],
})
export class SettingsComponent implements OnInit {
  readonly MAX_NAME_LENGTH = 50;
  readonly MAX_TAGTEXT_LENGTH = 10;

  user: User;
  form: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(50)]],
    post: ['', Validators.maxLength(20)],
    profile: ['', Validators.maxLength(400)],
    links: ['', Validators.maxLength(400)],
    tags: [['']],
  });
  selectable = true;
  removable = true;
  addOnBlur = true;
  tags: string[] = [];
  isOpen = false;
  separatorKeysCodes: number[] = [ENTER, COMMA];

  get nameControl(): FormControl {
    return this.form.get('name') as FormControl;
  }
  get postControl(): FormControl {
    return this.form.get('post') as FormControl;
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

  user$: Observable<User> = this.authService.user$;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    public userService: UserService,
    private dialog: MatDialog
  ) {
    this.user$.subscribe((user) => {
      this.user = user;
    });
  }

  addTag(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim() && value.length <= this.MAX_TAGTEXT_LENGTH) {
      this.tags.push(value.trim());
    }

    if (input) {
      input.value = '';
    }
    this.tagsControl.patchValue(null);
  }

  removeTag(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  ngOnInit(): void {
    this.user$.subscribe((user) => {
      if (user?.tags) {
        this.tags = user?.tags;
      }
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
      post: formData.post,
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
