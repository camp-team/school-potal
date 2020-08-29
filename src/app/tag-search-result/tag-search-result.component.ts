import { Component, OnInit } from '@angular/core';
import { Article } from '../interfaces/article';
import { SearchIndex } from 'algoliasearch/lite';
import { SearchService } from '../services/search.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tag-search-result',
  templateUrl: './tag-search-result.component.html',
  styleUrls: ['./tag-search-result.component.scss'],
})
export class TagSearchResultComponent implements OnInit {
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
      this.tag = map.get('tag');
      this.tagFilter = `tags: ${this.tag}`;
    });
    this.index
      .search('', {
        facetFilters: [this.tagFilter],
      })
      .then((result) => {
        this.result = result;
        this.articles = result.hits as any[];
      });
  }

  ngOnInit(): void {}
}
