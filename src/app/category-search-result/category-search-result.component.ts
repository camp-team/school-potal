import { Component, OnInit } from '@angular/core';
import { Article } from '../interfaces/article';
import { SearchIndex } from 'algoliasearch/lite';
import { SearchService } from '../services/search.service';
import { ArticleService } from '../services/article.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category-search-result',
  templateUrl: './category-search-result.component.html',
  styleUrls: ['./category-search-result.component.scss'],
})
export class CategorySearchResultComponent implements OnInit {
  articles: Article[];

  index: SearchIndex = this.searchService.index.item;
  searchQuery: string;
  tag: string;
  tagFilter: string;
  category: string;
  categoryFilter: string;

  result: {
    nbHits: number;
    hits: any[];
  };

  searchOptions = {
    page: 0,
    hitsPerPage: 20,
    facetFilters: [''],
  };

  constructor(
    private searchService: SearchService,
    private route: ActivatedRoute
  ) {
    this.route.paramMap.subscribe((map) => {
      this.category = map.get('category');
      this.categoryFilter = `category: ${this.category}`;
    });

    this.index
      .search('', {
        facetFilters: [this.categoryFilter],
      })
      .then((result) => {
        this.result = result;
        this.articles = result.hits as any[];
      });
  }

  ngOnInit(): void {}
}
