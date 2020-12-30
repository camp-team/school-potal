import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchIndex } from 'algoliasearch/lite';
import { AuthService } from 'src/app/services/auth.service';
import { SearchService } from 'src/app/services/search.service';
import { SeoService } from 'src/app/services/seo.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  index: SearchIndex = this.searchService.index.item;
  tags: {
    value: string;
    highlighted: string;
    count: number;
    selected?: boolean;
  }[];

  constructor(
    private authService: AuthService,
    private seoService: SeoService,
    private searchService: SearchService,
    private router: Router
  ) {
    this.seoService.setTitleAndMeta(
      'ログインとサービスの紹介',
      'ログインとサービスの紹介ページ'
    );
  }

  ngOnInit(): void {
    this.index.searchForFacetValues('tags', '').then((result) => {
      this.tags = result.facetHits;
    });
  }

  googleLogin() {
    this.authService.googleLogin();
  }

  twitterLogin() {
    this.authService.twitterLogin();
  }

  routeTagFilter(tag: string) {
    this.router.navigate(['/search'], {
      queryParamsHandling: 'merge',
      queryParams: { tag },
    });
  }
}
