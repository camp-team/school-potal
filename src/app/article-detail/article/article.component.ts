import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/sevices/article.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/interfaces/article';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  article$: Observable<Article> = this.route.paramMap.pipe(
    switchMap((map) => {
      const articleId = map.get('articleId');
      return this.articleService.getArticle(articleId);
    })
  );

  articleId: string;

  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}
}
