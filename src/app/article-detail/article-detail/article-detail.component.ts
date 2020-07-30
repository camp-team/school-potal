import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces/article';
import { ArticleService } from 'src/app/services/article.service';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss'],
})
export class ArticleDetailComponent implements OnInit {
  article$: Observable<Article> = this.route.paramMap.pipe(
    switchMap((param) => {
      const articleId = param.get('articleId');
      return this.articleService.getArticle(articleId);
    }),
    tap(() => this.loadingService.toggleLoading(false))
  );
  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private loadingService: LoadingService
  ) {
    this.loadingService.toggleLoading(true);
  }

  ngOnInit(): void {}
}
