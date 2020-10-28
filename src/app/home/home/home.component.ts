import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SearchIndex } from 'algoliasearch/lite';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { Observable } from 'rxjs';
import { debounceTime, startWith } from 'rxjs/operators';
import { User } from 'src/app/interfaces/users';
import { SearchDialogComponent } from 'src/app/search-dialog/search-dialog.component';
import { AuthService } from 'src/app/services/auth.service';
import { SearchService } from 'src/app/services/search.service';
import { RequestDialogComponent } from 'src/app/shared/request-dialog/request-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  searchControl: FormControl = new FormControl();

  index: SearchIndex = this.searchService.index.item;
  searchOptions = [];
  result: {
    nbHits: number;
    hits: any[];
  };

  config: SwiperConfigInterface = {
    loop: true,
    slidesPerView: 1,
    effect: 'fade',
    autoplay: {
      delay: 6000,
      disableOnInteraction: true,
    },
    speed: 1000,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next-hero',
      prevEl: '.swiper-button-prev-hero',
    },
  };

  user$: Observable<User> = this.authService.user$;

  constructor(
    private dialog: MatDialog,
    private authService: AuthService,
    private searchService: SearchService,
    private router: Router
  ) {}

  autoplayStop() {
    this.config.autoplay = false;
  }

  autoplayStart() {
    this.config.autoplay = true;
  }

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(startWith(''), debounceTime(500))
      .subscribe((key) => {
        this.index
          .search(key)
          .then((result) => (this.searchOptions = result.hits));
      });
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
        maxWidth: '100vw',
        minWidth: '30%',
        autoFocus: false,
      })
      .afterClosed();
  }

  openRequestDialog() {
    this.dialog
      .open(RequestDialogComponent, {
        maxWidth: '100vw',
        minWidth: '30%',
        autoFocus: false,
      })
      .afterClosed();
  }
}
