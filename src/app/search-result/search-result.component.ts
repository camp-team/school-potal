import { Component, OnInit } from '@angular/core';
import { SearchIndex } from 'algoliasearch/lite';
import { SearchService } from '../services/search.service';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../interfaces/article';
import { LoadingService } from '../services/loading.service';

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
  index: SearchIndex = this.searchService.index.item;

  result: {
    nbHits: number;
    hits: any[];
  };

  constructor(
    private searchService: SearchService,
    private route: ActivatedRoute,
    public loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((param) => {
      this.articles = [];
      this.searchQuery = param.get('searchQuery') || '';
      this.tagFilter = (param.get('tag') || '').split('+');
      this.categoryFilter = (param.get('category') || '').split('+');
      this.searchArticles();
    });
  }

  searchArticles() {
    this.tagFilter = this.tagFilter.map((tag) => `tags: ${tag}`);
    this.categoryFilter = this.categoryFilter.map(
      (category) => `category: ${category}`
    );
    const searchOptions = {
      facetFilters: [this.tagFilter, this.categoryFilter],
    };
    this.loadingService.loading = true;

    this.index
      .search(this.searchQuery, searchOptions)
      .then((result) => {
        this.result = result;
        this.articles = result.hits as any[];
      })
      .finally(() => (this.loadingService.loading = false));
  }
}
