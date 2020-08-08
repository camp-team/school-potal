import { Component, OnInit } from '@angular/core';
import { CommentService } from 'src/app/services/comment.service';
import { ArticleService } from 'src/app/services/article.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CommentWithUser, Comment } from 'src/app/interfaces/comment';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss'],
})
export class CommentListComponent implements OnInit {
  articleId: string;
  comments$: Observable<CommentWithUser[]> = this.route.paramMap.pipe(
    switchMap((map) => {
      this.articleId = map.get('articleId');
      return this.commentService.getCommentsWithUserByArticleId(this.articleId);
    }),
    tap((data) => console.log(data))
  );

  constructor(
    private commentService: CommentService,
    private articleService: ArticleService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}
}
