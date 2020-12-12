import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces/article';
import { ArticleService } from 'src/app/services/article.service';
import { Observable } from 'rxjs';
import { switchMap, tap, map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { UiService } from 'src/app/services/ui.service';
import { SeoService } from 'src/app/services/seo.service';
import { Meta } from '@angular/platform-browser';

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
      return this.articleService.getArticle(id).pipe(
        tap((article) => {
          this.seoService.setTitleAndMeta(`${article.title} | eduu`);
          this.meta.addTags([
            { property: 'og:title', content: article.title },
            { name: 'description', content: article.features.join(',') },
            { property: 'og:image', content: article.thumbnailURL },
          ]);
        })
      );
    }),
    tap(() => this.uiService.toggleLoading(false))
  );

  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private uiService: UiService,
    private seoService: SeoService,
    private meta: Meta
  ) {
    this.uiService.toggleLoading(true);
    this.articleId$.subscribe((id) => (this.articleId = id));
  }

  ngOnInit(): void {}
}
