import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces/article';
import { ArticleService } from 'src/app/services/article.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoadingService } from 'src/app/services/loading.service';
import { newArray } from '@angular/compiler/src/util';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
})
export class ArticleListComponent implements OnInit {
  articles$: Observable<Article[]> = this.articleService
    .getArticles()
    .pipe(tap(() => this.loadingService.toggleLoading(false)));

  spins = newArray(5);

  constructor(
    private articleService: ArticleService,
    private loadingService: LoadingService
  ) {
    this.loadingService.toggleLoading(true);
  }

  ngOnInit(): void {}
}
