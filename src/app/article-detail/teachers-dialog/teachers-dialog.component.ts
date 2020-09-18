import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Article } from 'src/app/interfaces/article';
import { Teacher } from 'src/app/interfaces/teacher';

@Component({
  selector: 'app-teacher-dialog',
  templateUrl: './teachers-dialog.component.html',
  styleUrls: ['./teachers-dialog.component.scss'],
})
export class TeacherDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      article: Article;
      teachers: Teacher[];
    }
  ) {}

  ngOnInit(): void {}
}
