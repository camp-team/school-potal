import { Component, OnInit } from '@angular/core';
import { SearchIndex } from 'algoliasearch/lite';
import { SearchService } from '../services/search.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Article } from '../interfaces/article';
import { ArticleService } from 'src/app/services/article.service';
import { tap, map } from 'rxjs/operators';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
})
export class SearchResultComponent implements OnInit {
  articles$: Observable<Article[]>;

  index: SearchIndex = this.searchService.index.item;
  searchQuery: string;

  result: {
    nbHits: number;
    hits: any[];
  };

  searchOptions = {
    page: 0,
    hitsPerPage: 20,
  };

  constructor(
    private articleService: ArticleService,
    private searchService: SearchService,
    private route: ActivatedRoute,
    private router: Router,
    private loadingService: LoadingService
  ) {
    this.route.queryParamMap.subscribe((params) => {
      this.searchQuery = params.get('searchQuery');
      this.index
        .search(this.searchQuery)
        .then((result) => {
          this.result = result;
        })
        .then(() => {
          if (this.result.hits) {
            const searchResultIds: string[] = this.result.hits.map(
              (searchResult) => searchResult.id
            );
            this.articles$ = this.articleService.getArticles().pipe(
              map((articles: Article[]) => {
                return articles.filter((article: Article) =>
                  searchResultIds.includes(article.id)
                );
              })
            );
          }
        });
    });
    this.loadingService.toggleLoading(true);
  }

  ngOnInit(): void {}
}
