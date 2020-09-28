import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces/article';
import { ArticleService } from 'src/app/services/article.service';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { LoadingService } from 'src/app/services/loading.service';
import { newArray } from '@angular/compiler/src/util';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
})
export class ArticleListComponent implements OnInit {
  isloading: boolean;
  isComplete: boolean;
  lastDoc;
  articles = [];

  spins = newArray(5);

  constructor(
    private articleService: ArticleService,
    public loadingService: LoadingService
  ) {}

  ngOnInit(): void {}

  getArticlesLimited() {
    console.log('check');

    this.isloading = true;
    if (this.isComplete) {
      console.log('complete');
      this.isloading = false;
      return;
    }
    this.articleService
      .getArticlesLimited(this.lastDoc)
      .subscribe((articles) => {
        if (articles) {
          if (!articles.length) {
            this.isComplete = true;
            this.isloading = false;
            console.log('check');
            return;
          }
          this.lastDoc = articles[articles.length - 1];
          const articlesData = articles.map((doc) => doc.data());
          this.articles.push(...articlesData);
          this.isloading = false;
          console.log('scroll');
        }
      });
  }
}
