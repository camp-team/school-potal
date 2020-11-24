import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces/article';
import { ArticleService } from 'src/app/services/article.service';
import { Observable } from 'rxjs';
import { switchMap, tap, map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss'],
})
export class ArticleDetailComponent implements OnInit {
  articleId: string;

  articleId$: Observable<string> = this.route.paramMap.pipe(
    map((param) => {
      return param.get('articleId');
    })
  );

  article$: Observable<Article> = this.articleId$.pipe(
    switchMap((id) => {
      return this.articleService.getArticle(id);
    }),
    tap(() => this.uiService.toggleLoading(false))
  );

  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private uiService: UiService
  ) {
    this.uiService.toggleLoading(true);
    this.articleId$.subscribe((id) => (this.articleId = id));
  }

  ngOnInit(): void {}
}
