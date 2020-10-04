import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Article } from 'src/app/interfaces/article';
import { ArticleService } from 'src/app/services/article.service';
import { EditorComponent } from '../editor/editor.component';

@Component({
  selector: 'app-editor-home',
  templateUrl: './editor-home.component.html',
  styleUrls: ['./editor-home.component.scss'],
})
export class EditorHomeComponent implements OnInit {
  childData: any;

  article$ = this.route.paramMap.pipe(
    switchMap((param) => {
      const articleId = param.get('articleId');
      return this.articleService.getArticle(articleId);
    })
  );

  navLinks = [
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
    private route: ActivatedRoute,
    private articleService: ArticleService
  ) {}

  ngOnInit(): void {}

  onReceive(eventData) {
    this.childData = eventData;
  }
}
