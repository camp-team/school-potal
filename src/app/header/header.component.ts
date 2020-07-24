import { Component, OnInit } from '@angular/core';
import { DrawerService } from '../services/drawer.service';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { User } from '../interfaces/users';
import { FormControl } from '@angular/forms';
import { SearchService } from '../services/search.service';
import { SearchIndex } from 'algoliasearch/lite';
import { Router } from '@angular/router';
import { startWith, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  user$: Observable<User> = this.authService.user$;
  searchControl: FormControl = new FormControl();
  index: SearchIndex = this.searchService.index.item;

  result: {
    nbHits: number;
    hits: any[];
  };

  searchOptions = [];

  constructor(
    private drawerService: DrawerService,
    private authService: AuthService,
    private searchService: SearchService,
    private router: Router
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
    this.drawerService.toggle();
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
}
