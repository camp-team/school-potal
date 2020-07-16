import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/interfaces/article';
import { switchMap, tap, map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { StudentsDialogComponent } from '../students-dialog/students-dialog.component';
import { LoadingService } from 'src/app/services/loading.service';
import { Teacher } from 'src/app/interfaces/teacher';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  article$: Observable<Article> = this.route.paramMap.pipe(
    switchMap((param) => {
      const articleId = param.get('articleId');
      return this.articleService.getArticle(articleId);
    }),
    tap(() => this.loadingService.toggleLoading(false))
  );

  teachers$: Observable<Teacher[]> = this.route.paramMap.pipe(
    switchMap((data) => {
      const articleId = data.get('articleId');
      return this.articleService.getTeachers(articleId);
    })
  );

  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private loadingService: LoadingService
  ) {
    this.loadingService.toggleLoading(true);
  }

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
