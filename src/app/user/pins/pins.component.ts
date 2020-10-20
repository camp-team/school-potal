import { Component, OnInit } from '@angular/core';
import { PinService } from 'src/app/services/pin.service';
import { Observable } from 'rxjs';
import { Article } from 'src/app/interfaces/article';
import { User } from 'src/app/interfaces/users';
import { AuthService } from 'src/app/services/auth.service';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pins',
  templateUrl: './pins.component.html',
  styleUrls: ['./pins.component.scss'],
})
export class PinsComponent implements OnInit {
  user$: Observable<User> = this.authService.user$;

  articles$: Observable<Article[]> = this.route.parent.paramMap.pipe(
    switchMap((map) => {
      const uid = map.get('uid');
      return this.pinService.getPinnedArticles(uid);
    })
  );

  constructor(
    private pinService: PinService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}
}
