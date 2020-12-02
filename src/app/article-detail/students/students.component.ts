import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Article } from 'src/app/interfaces/article';
import { StudentWithUser } from 'src/app/interfaces/student';
import { UserService } from 'src/app/services/user.service';
import { StudentsDialogComponent } from '../students-dialog/students-dialog.component';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
})
export class StudentsComponent implements OnInit {
  @Input() article: Article;

  students$: Observable<StudentWithUser[]> = this.route.paramMap.pipe(
    switchMap((params) => {
      const articleId = params.get('articleId');
      return this.userService.getStudentsWithUser(articleId);
    })
  );

  constructor(
    private dialog: MatDialog,
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  openStudentsDialog(article: Article, students: StudentWithUser[]) {
    this.dialog.open(StudentsDialogComponent, {
      width: '400px',
      autoFocus: false,
      restoreFocus: false,
      data: { article, students },
    });
  }
}
