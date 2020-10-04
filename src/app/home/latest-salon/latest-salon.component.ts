import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { UiService } from 'src/app/services/ui.service';
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
    slidesPerView: 4,
    navigation: true,
    observer: true,
    watchOverflow: true,
    spaceBetween: 24,
    breakpoints: {
      415: {
        slidesPerView: 1,
        spaceBetween: 16,
      },
      960: {
        slidesPerView: 3,
        spaceBetween: 24,
      },
    },
  };

  index: number;

  spins = newArray(5);

  salons$: Observable<Article[]> = this.articleService
    .getSalons()
    .pipe(tap(() => this.uiService.toggleLoading(false)));

  constructor(
    private articleService: ArticleService,
    private uiService: UiService
  ) {
    this.uiService.toggleLoading(true);
  }

  ngOnInit(): void {}
}