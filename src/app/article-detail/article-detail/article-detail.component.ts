import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces/article';
import { ArticleService } from 'src/app/services/article.service';
import { Observable } from 'rxjs';
import { switchMap, tap, map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { LoadingService } from 'src/app/services/loading.service';
import { CommentWithUser } from 'src/app/interfaces/comment';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss'],
})
export class ArticleDetailComponent implements OnInit {
  articleId: string;

  articleId$: Observable<string> = this.route.paramMap.pipe(
    map((param) => {
      return param.get('articleId');
    })
  );

  article$: Observable<Article> = this.articleId$.pipe(
    switchMap((id) => {
      return this.articleService.getArticle(id);
    }),
    tap(() => this.loadingService.toggleLoading(false))
  );

  comments$: Observable<CommentWithUser[]> = this.articleId$.pipe(
    switchMap((id) => {
      return this.commentService.getCommentsWithUserByArticleId(id);
    })
  );

  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private loadingService: LoadingService,
    private commentService: CommentService
  ) {
    this.loadingService.toggleLoading(true);
    this.articleId$.subscribe((id) => (this.articleId = id));
  }

  ngOnInit(): void {}
}
