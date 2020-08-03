import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { LoadingService } from 'src/app/services/loading.service';
import { Observable } from 'rxjs';
import { Article } from 'src/app/interfaces/article';
import { tap } from 'rxjs/operators';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

@Component({
  selector: 'app-latest-school',
  templateUrl: './latest-school.component.html',
  styleUrls: ['./latest-school.component.scss'],
})
export class LatestSchoolComponent implements OnInit {
  config: SwiperConfigInterface = {
    loop: true,
    loopedSlides: 3,
    slidesPerView: 5,
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

  schools$: Observable<Article[]> = this.articleService
    .getSchools()
    .pipe(tap(() => this.loadingService.toggleLoading(false)));

  constructor(
    private articleService: ArticleService,
    private loadingService: LoadingService
  ) {
    this.loadingService.toggleLoading(true);
  }

  ngOnInit(): void {}
}
