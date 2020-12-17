import { Component, OnInit } from '@angular/core';
import { PinService } from 'src/app/services/pin.service';
import { Observable } from 'rxjs';
import { Article } from 'src/app/interfaces/article';
import { User } from 'src/app/interfaces/users';
import { AuthService } from 'src/app/services/auth.service';
import { switchMap, tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { fade } from 'src/app/animations';

@Component({
  selector: 'app-pins',
  templateUrl: './pins.component.html',
  styleUrls: ['./pins.component.scss'],
  animations: [fade],
})
export class PinsComponent implements OnInit {
  isloading: boolean;

  user$: Observable<User> = this.authService.user$;

  articles$: Observable<Article[]> = this.route.parent.paramMap.pipe(
    switchMap((map) => {
      const uid = map.get('uid');
      return this.pinService.getPinnedArticles(uid).pipe(
        tap(() => {
          this.isloading = false;
        })
      );
    })
  );

  constructor(
    private pinService: PinService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.isloading = true;
  }
}
