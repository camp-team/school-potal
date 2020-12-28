import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SearchIndex } from 'algoliasearch/lite';
import { debounceTime, startWith } from 'rxjs/operators';
import { fade } from 'src/app/animations';
import { Article } from 'src/app/interfaces/article';
import { SearchService } from 'src/app/services/search.service';
import { SeoService } from 'src/app/services/seo.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
  animations: [fade],
})
export class SearchResultComponent implements OnInit {
  @Input() result: {
    nbHits: number;
    hits: any[];
  };

  articles: Article[];
  searchQuery: string;
  searchControl: FormControl = new FormControl();
  index: SearchIndex = this.searchService.index.item;
  nbPages: number;
  searchOptions = [];
  tagsFilter: string;
  categoriesFilter: string;

  private page = 0;
  private maxPage: number;
  private requestOptions: any = {};
  private isInit = true;

  constructor(
    public uiService: UiService,
    private searchService: SearchService,
    private route: ActivatedRoute,
    private seoService: SeoService
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((param) => {
      this.articles = [];
      this.searchQuery = param.get('searchQuery') || '';
      this.requestOptions = {
        page: 0,
        hitsPerPage: 6,
      };
      this.searchService.tagFilter = (param.get('tag') || '').split(',');
      this.searchService.categoryFilter = (param.get('category') || '').split(
        ','
      );

      if (this.searchQuery) {
        this.seoService.setTitleAndMeta(
          `${this.searchQuery}に関するスクール/オンラインサロン`,
          `${this.searchQuery}に関する関連記事を表示するページ`
        );
      }
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

  searchArticles() {
    this.tagsFilter = this.searchService.tagFilter
      .map((tag) => `tags: ${tag}`)
      .join(',');
    this.categoriesFilter = this.searchService.categoryFilter
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
