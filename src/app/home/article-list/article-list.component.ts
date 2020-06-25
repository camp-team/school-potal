import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces/article';
import { ArticleService } from 'src/app/services/article.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
})
export class ArticleListComponent implements OnInit {
  articles$: Observable<Article[]> = this.articleService.getArticles();

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {}
}
