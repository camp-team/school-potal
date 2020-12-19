import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/users';
import { AuthService } from 'src/app/services/auth.service';
import { SeoService } from 'src/app/services/seo.service';

@Component({
  selector: 'app-editor-home',
  templateUrl: './editor-home.component.html',
  styleUrls: ['./editor-home.component.scss'],
})
export class EditorHomeComponent implements OnInit {
  childData: any;
  user$: Observable<User> = this.authService.user$;

  readonly navLinks = [
    {
      label: '新規作成',
      path: 'create',
    },
    {
      label: '記事一覧',
      path: 'editor-article-list',
    },
  ];

  constructor(
    private seoService: SeoService,
    private authService: AuthService
  ) {
    this.seoService.setTitleAndMeta(
      '管理画面 | eduu',
      'オーナーのダッシュボードページ'
    );
  }

  ngOnInit(): void {}

  onReceive(eventData) {
    this.childData = eventData;
  }
}
