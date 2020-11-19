import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { SearchIndex } from 'algoliasearch/lite';
import { SearchService } from '../services/search.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from '../interfaces/article';
import { UiService } from '../services/ui.service';
import { fade } from '../animations';
import { FormControl } from '@angular/forms';
import { debounceTime, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
  animations: [fade],
})
export class SearchResultComponent implements OnInit, AfterViewInit {
  @ViewChild('target') private elementRef: ElementRef;
  articles: Article[];
  searchQuery: string;
  searchControl: FormControl = new FormControl();
  index: SearchIndex = this.searchService.index.item;
  result: {
    nbHits: number;
    hits: any[];
  };
  nbPages: number;
  tagFilter: string[];
  categoryFilter: string[];
  searchOptions = [];

  private page = 0;
  private maxPage: number;
  private requestOptions: any = {};
  private isInit = true;
  private tagsFilter: string;
  private categoriesFilter: string;

  constructor(
    private searchService: SearchService,
    private route: ActivatedRoute,
    private router: Router,
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

    this.searchControl.valueChanges
      .pipe(startWith(''), debounceTime(500))
      .subscribe((key) => {
        this.index
          .search(key)
          .then((result) => (this.searchOptions = result.hits));
      });
  }

  ngAfterViewInit(): void {
    this.elementRef.nativeElement.focus();
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

  setSearchQuery(value: string) {
    this.searchControl.setValue(value, {
      emitEvent: false,
    });
  }

  routeSearch(searchQuery: string) {
    this.router.navigate(['/search'], {
      queryParamsHandling: 'merge',
      queryParams: { searchQuery },
    });
  }
}
