import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss'],
})
export class CommentFormComponent implements OnInit {
  commentForm = new FormControl('', [
    Validators.maxLength(400),
    Validators.required,
  ]);

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  submit() {
    const formData = this.commentForm.value;
    console.log(formData);
  }
}
