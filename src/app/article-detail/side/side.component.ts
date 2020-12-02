import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces/article';
import { ArticleService } from 'src/app/services/article.service';
import { SearchIndex } from 'algoliasearch/lite';
import { SearchService } from 'src/app/services/search.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { UiService } from 'src/app/services/ui.service';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

@Component({
  selector: 'app-side',
  templateUrl: './side.component.html',
  styleUrls: ['./side.component.scss'],
})
export class SideComponent implements OnInit {
  article: Article;
  index: SearchIndex = this.searchService.index.popular;
  articles: Article[] = [];
  result: {
    nbHits: number;
    hits: any[];
  };
  categoryFilter: string;
  requestOptions: any = {};

  config: SwiperConfigInterface = {
    loop: true,
    slidesPerView: 5,
    observer: true,
    watchOverflow: true,
    spaceBetween: 24,
    centeredSlides: true,
    breakpoints: {
      415: {
        slidesPerView: 2,
        spaceBetween: 16,
      },
      960: {
        slidesPerView: 3,
        spaceBetween: 16,
      },
    },
  };

  constructor(
    private articleService: ArticleService,
    private searchService: SearchService,
    private route: ActivatedRoute,
    public uiService: UiService
  ) {
    this.articles = [];
    this.searchArticles();
  }

  ngOnInit(): void {}

  searchArticles() {
    this.uiService.loading = true;
    this.route.paramMap
      .pipe(
        switchMap((param) => {
          const articleId = param.get('articleId');
          return this.articleService.getArticle(articleId);
        })
      )
      .subscribe((article) => {
        this.article = article;
        this.categoryFilter = `category: ${article?.category}`;
        this.requestOptions = {
          page: 0,
          hitsPerPage: 9,
        };
        const searchOptions = {
          ...this.requestOptions,
          facetFilters: [this.categoryFilter, `id: -${article.id}`],
        };
        this.index
          .search('', searchOptions)
          .then((result) => {
            this.articles.push(...(result.hits as any[]));
          })
          .finally(() => (this.uiService.loading = false));
      });
  }
}
