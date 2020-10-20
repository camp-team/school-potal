import { Component, OnInit } from '@angular/core';
import { SearchService } from '../services/search.service';
import { FormControl } from '@angular/forms';
import { SearchIndex } from 'algoliasearch/lite';
import { startWith, debounceTime } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-search-dialog',
  templateUrl: './search-dialog.component.html',
  styleUrls: ['./search-dialog.component.scss'],
})
export class SearchDialogComponent implements OnInit {
  searchControl: FormControl = new FormControl();
  index: SearchIndex = this.searchService.index.item;
  result: {
    nbHits: number;
    hits: any[];
  };
  searchOptions = [];

  constructor(
    private searchService: SearchService,
    private router: Router,
    private dialogRef: MatDialogRef<SearchDialogComponent>
  ) {
    this.searchControl.valueChanges
      .pipe(startWith(''), debounceTime(500))
      .subscribe((key) => {
        this.index
          .search(key)
          .then((result) => (this.searchOptions = result.hits));
      });
  }

  ngOnInit(): void {}

  setSearchQuery(value) {
    this.searchControl.setValue(value, {
      emitEvent: false,
    });
  }

  routeSearch(searchQuery: string) {
    this.router.navigate(['/search'], {
      queryParamsHandling: 'merge',
      queryParams: { searchQuery },
    });
    this.dialogRef.close();
  }
}
