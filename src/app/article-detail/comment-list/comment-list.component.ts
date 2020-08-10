import { Component, OnInit } from '@angular/core';
import { CommentService } from 'src/app/services/comment.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CommentWithUser } from 'src/app/interfaces/comment';
import { User } from 'src/app/interfaces/users';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss'],
})
export class CommentListComponent implements OnInit {
  user$: Observable<User> = this.authService.user$;

  articleId: string;
  comments$: Observable<CommentWithUser[]> = this.route.paramMap.pipe(
    switchMap((map) => {
      this.articleId = map.get('articleId');
      return this.commentService.getCommentsWithUserByArticleId(this.articleId);
    })
  );

  constructor(
    private commentService: CommentService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}
}
