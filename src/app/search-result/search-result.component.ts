import { Component, OnInit } from '@angular/core';
import { SearchIndex } from 'algoliasearch/lite';
import { SearchService } from '../services/search.service';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../interfaces/article';
import { UiService } from '../services/ui.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
})
export class SearchResultComponent implements OnInit {
  articles: Article[];
  searchQuery: string;
  tagFilter: string[];
  categoryFilter: string[];
  tagsFilter: string;
  categoriesFilter: string;
  index: SearchIndex = this.searchService.index.item;

  result: {
    nbHits: number;
    hits: any[];
  };

  page = 0;
  nbPages: number;
  maxPage: number;
  requestOptions: any = {};
  isInit = true;

  constructor(
    private searchService: SearchService,
    private route: ActivatedRoute,
    public uiService: UiService
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((param) => {
      this.articles = [];
      this.searchQuery = param.get('searchQuery') || '';
      this.requestOptions = {
        page: 0,
        hitsPerPage: 6,
      };
      this.tagFilter = (param.get('tag') || '').split(',');
      this.categoryFilter = (param.get('category') || '').split(',');
      this.searchArticles();
      this.isInit = false;
    });
  }

  searchArticles() {
    this.tagsFilter = this.tagFilter.map((tag) => `tags: ${tag}`).join(',');
    this.categoriesFilter = this.categoryFilter
      .map((category) => `category: ${category}`)
      .join(',');
    const searchOptions = {
      ...this.requestOptions,
      facetFilters: [this.tagsFilter, this.categoriesFilter],
    };
    this.uiService.loading = true;

    if (!this.maxPage || this.maxPage > this.page) {
      this.requestOptions.page++;
      this.uiService.loading = true;
      setTimeout(
        () => {
          this.index
            .search(this.searchQuery, searchOptions)
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
  }
}
