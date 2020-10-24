import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { User } from '../interfaces/users';
import { FormControl } from '@angular/forms';
import { SearchService } from '../services/search.service';
import { SearchIndex } from 'algoliasearch/lite';
import { Router } from '@angular/router';
import { startWith, debounceTime } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { SearchDialogComponent } from '../search-dialog/search-dialog.component';
import { UiService } from '../services/ui.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  searchControl: FormControl = new FormControl();
  index: SearchIndex = this.searchService.index.item;
  searchOptions = [];
  result: {
    nbHits: number;
    hits: any[];
  };

  user$: Observable<User> = this.authService.user$;

  constructor(
    private uiService: UiService,
    private authService: AuthService,
    private searchService: SearchService,
    private router: Router,
    private dialog: MatDialog
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

  toggle() {
    this.uiService.toggleOpening();
  }

  logout() {
    this.authService.logout();
  }

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
  }

  openSearchDialog() {
    this.dialog
      .open(SearchDialogComponent, {
        width: '100%',
        autoFocus: false,
      })
      .afterClosed();
  }
}
