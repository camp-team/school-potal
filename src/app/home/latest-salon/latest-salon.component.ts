import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { LoadingService } from 'src/app/services/loading.service';
import { Observable } from 'rxjs';
import { Article } from 'src/app/interfaces/article';
import { tap } from 'rxjs/operators';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { newArray } from '@angular/compiler/src/util';

@Component({
  selector: 'app-latest-salon',
  templateUrl: './latest-salon.component.html',
  styleUrls: ['./latest-salon.component.scss'],
})
export class LatestSalonComponent implements OnInit {
  config: SwiperConfigInterface = {
    loop: true,
    loopedSlides: 1,
    slidesPerView: 5,
    navigation: true,
    observer: true,
    watchOverflow: true,
    breakpoints: {
      415: {
        slidesPerView: 1,
        spaceBetween: 16,
      },
      960: {
        slidesPerView: 3,
        spaceBetween: 16,
      },
    },
  };

  index: number;

  spins = newArray(5);

  salons$: Observable<Article[]> = this.articleService
    .getSalons()
    .pipe(tap(() => this.loadingService.toggleLoading(false)));

  constructor(
    private articleService: ArticleService,
    private loadingService: LoadingService
  ) {
    this.loadingService.toggleLoading(true);
  }

  ngOnInit(): void {}
}
