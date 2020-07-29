import { Component, OnInit, Input } from '@angular/core';
import { Article } from 'src/app/interfaces/article';
import { ArticleService } from 'src/app/services/article.service';
import { Observable } from 'rxjs';
import { SearchIndex } from 'algoliasearch/lite';
import { SearchService } from 'src/app/services/search.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-side',
  templateUrl: './side.component.html',
  styleUrls: ['./side.component.scss'],
})
export class SideComponent implements OnInit {
  article: Article;
  index: SearchIndex = this.searchService.index.item;
  articles: Article[];
  result: {
    nbHits: number;
  };

  constructor(
    private articleService: ArticleService,
    private searchService: SearchService,
    private route: ActivatedRoute
  ) {
    this.route.paramMap
      .pipe(
        switchMap((param) => {
          const articleId = param.get('articleId');
          return this.articleService.getArticle(articleId);
        })
      )
      .subscribe((article) => {
        this.article = article;
        const categoryFilter = `category: ${article.category}`;
        this.index
          .search('', {
            facetFilters: [categoryFilter, `id: -${article.id}`],
          })
          .then((result) => {
            this.articles = result.hits as any[];
          });
      });
  }

  ngOnInit(): void {}
}
