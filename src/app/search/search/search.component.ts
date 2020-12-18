import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { SearchIndex } from 'algoliasearch/lite';
import { debounceTime, startWith } from 'rxjs/operators';
import { fade } from 'src/app/animations';
import { Article } from 'src/app/interfaces/article';
import { SearchService } from 'src/app/services/search.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  animations: [fade],
})
export class SearchComponent implements OnInit, AfterViewInit {
  @ViewChild('target') private elementRef: ElementRef;
  articles: Article[];
  searchControl: FormControl = new FormControl();
  index: SearchIndex = this.searchService.index.item;
  searchOptions = [];

  constructor(
    private router: Router,
    public searchService: SearchService,
    public uiService: UiService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(startWith(''), debounceTime(500))
      .subscribe((key) => {
        this.index
          .search(key)
          .then((result) => (this.searchOptions = result.hits));
      });
    this.cd.detectChanges();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.elementRef.nativeElement.focus();
    }, 0);
  }

  setSearchQuery(value: string): void {
    this.searchControl.setValue(value, {
      emitEvent: false,
    });
  }

  routeSearch(searchQuery: string): void {
    this.router.navigate(['/search'], {
      queryParamsHandling: 'merge',
      queryParams: { searchQuery },
    });
  }
}
