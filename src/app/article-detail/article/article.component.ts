import { Component, OnInit, Input } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/interfaces/article';
import { switchMap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { StudentsDialogComponent } from '../students-dialog/students-dialog.component';
import { Teacher } from 'src/app/interfaces/teacher';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  @Input() article: Article;

  teachers$: Observable<Teacher[]> = this.route.paramMap.pipe(
    switchMap((data) => {
      const articleId = data.get('articleId');
      return this.articleService.getTeachers(articleId);
    })
  );

  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  openStudentsDialog(article: Article) {
    this.dialog.open(StudentsDialogComponent, {
      width: '400px',
      autoFocus: false,
      restoreFocus: false,
      data: { article },
    });
  }
}
