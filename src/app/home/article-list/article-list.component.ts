import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { UiService } from 'src/app/services/ui.service';
import { newArray } from '@angular/compiler/src/util';
import { Article } from 'src/app/interfaces/article';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
})
export class ArticleListComponent implements OnInit {
  isloading: boolean;
  isComplete: boolean;
  lastDoc;
  articles: Article[] = [];

  spins = newArray(5);

  constructor(
    private articleService: ArticleService,
    public uiService: UiService
  ) {}

  ngOnInit(): void {}

  getArticlesLimited() {
    this.isloading = true;
    if (this.isComplete) {
      this.isloading = false;
      return;
    }
    this.isloading = true;
    this.articleService
      .getArticlesLimited(this.lastDoc)
      .subscribe((articles) => {
        if (articles) {
          if (!articles.length) {
            this.isComplete = true;
            this.isloading = false;
            return;
          }
          this.lastDoc = articles[articles.length - 1];
          const articlesData = articles.map((doc) => doc.data());
          this.articles.push(...articlesData);
          this.isloading = false;
        } else {
          this.isComplete = true;
          this.isloading = false;
        }
      });
  }
}
