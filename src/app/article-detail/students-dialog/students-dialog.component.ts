import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Article } from 'src/app/interfaces/article';
import { StudentWithUser } from 'src/app/interfaces/student';

@Component({
  selector: 'app-students-dialog',
  templateUrl: './students-dialog.component.html',
  styleUrls: ['./students-dialog.component.scss'],
})
export class StudentsDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      article: Article;
      students: StudentWithUser[];
    }
  ) {}

  ngOnInit(): void {}
}
