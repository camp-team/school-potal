import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { UiService } from 'src/app/services/ui.service';
import { Observable } from 'rxjs';
import { Article } from 'src/app/interfaces/article';
import { tap } from 'rxjs/operators';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { newArray } from '@angular/compiler/src/util';

@Component({
  selector: 'app-latest-school',
  templateUrl: './latest-school.component.html',
  styleUrls: ['./latest-school.component.scss'],
})
export class LatestSchoolComponent implements OnInit {
  config: SwiperConfigInterface = {
    loop: true,
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
        spaceBetween: 16,
      },
    },
  };

  index: number;

  spins = newArray(5);

  schools$: Observable<Article[]> = this.articleService.getSchools().pipe(
    tap(() => {
      this.uiService.toggleLoading(false);
    })
  );

  constructor(
    private articleService: ArticleService,
    private uiService: UiService
  ) {
    this.uiService.toggleLoading(true);
  }

  ngOnInit(): void {}
}
