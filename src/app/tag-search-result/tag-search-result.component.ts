import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from '../interfaces/article';
import { SearchIndex } from 'algoliasearch/lite';
import { SearchService } from '../services/search.service';
import { Route, ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ArticleService } from '../services/article.service';

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
    private route: ActivatedRoute,
    private articleService: ArticleService
  ) {
    this.route.paramMap.subscribe((map) => {
      this.tag = map.get('tag');
      this.tagFilter = `tags: ${this.tag}`;
      console.log(this.tagFilter);
      console.log(this.tag);
    });
    this.index
      .search('', {
        facetFilters: [this.tagFilter],
      })
      .then((result) => {
        this.result = result;
        this.articles = result.hits as any[];
        console.log(this.articles);
      });
  }

  ngOnInit(): void {}
}
