import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { SeoService } from 'src/app/services/seo.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private seoService: SeoService
  ) {
    this.seoService.setTitleAndMeta(
      'ログインとサービスの紹介',
      'ログインとサービスの紹介ページ'
    );
  }

  ngOnInit(): void {}

  googleLogin() {
    this.authService.googleLogin();
  }

  twitterLogin() {
    this.authService.twitterLogin();
  }
}
