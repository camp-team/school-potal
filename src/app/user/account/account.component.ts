import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { switchMap, map, tap } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/interfaces/users';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  uId: string;
  plan: string;

  userId$: Observable<string> = this.route.paramMap.pipe(
    map((param) => {
      this.uId = param.get('uid');
      return this.uId;
    })
  );

  user$: Observable<User> = this.authService.user$;

  constructor(private route: ActivatedRoute, private authService: AuthService) {
    this.userId$.subscribe((uid) => (this.uId = uid));
  }

  ngOnInit(): void {}
}
