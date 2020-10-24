import { Component, Input, OnInit } from '@angular/core';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { Observable } from 'rxjs';
import { fade } from 'src/app/animations';
import { RequestWithUser } from 'src/app/interfaces/request';
import { User } from 'src/app/interfaces/users';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.scss'],
  animations: [fade],
})
export class RequestListComponent implements OnInit {
  @Input() user: User;

  config: SwiperConfigInterface = {
    loop: true,
    slidesPerView: 4,
    navigation: true,
    observer: true,
    watchOverflow: true,
    spaceBetween: 24,
    centeredSlides: true,
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

  requests$: Observable<
    RequestWithUser[]
  > = this.requestService.getRequestsWithUser();

  constructor(private requestService: RequestService) {}

  ngOnInit(): void {}
}
