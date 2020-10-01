import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces/article';
import { ArticleService } from 'src/app/services/article.service';
import { SearchIndex } from 'algoliasearch/lite';
import { SearchService } from 'src/app/services/search.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-side',
  templateUrl: './side.component.html',
  styleUrls: ['./side.component.scss'],
})
export class SideComponent implements OnInit {
  article: Article;
  index: SearchIndex = this.searchService.index.item;
  articles: Article[];
  result: {
    nbHits: number;
  };
  page = 0;
  nbPages: number;
  maxPage: number;
  isInit = true;
  categoryFilter: string;
  requestOptions = {
    page: 0,
    hitsPerPage: 6,
  };

  constructor(
    private articleService: ArticleService,
    private searchService: SearchService,
    private route: ActivatedRoute,
    public uiService: UiService
  ) {
    this.articles = [];
    this.maxPage = 0;
    this.searchArticles();
    this.isInit = false;
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
        const categoryFilter = `category: ${article?.category}`;

        if (!this.maxPage || this.maxPage > this.page) {
          this.requestOptions.page++;
          this.uiService.loading = true;

          setTimeout(
            () => {
              this.index
                .search('', {
                  ...this.requestOptions,
                  facetFilters: [categoryFilter, `id: -${article?.id}`],
                })
                .then((result) => {
                  this.maxPage = result.nbPages;
                  this.result = result;
                  this.articles.push(...(result.hits as any[]));
                })
                .then(() => (this.isInit = false))
                .finally(() => (this.uiService.loading = false));
            },
            this.isInit ? 0 : 1000
          );
        }
      });
  }
}
