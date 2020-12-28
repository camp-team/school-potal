import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Observable, of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { bounce, fadeup } from 'src/app/animations';
import { Article } from 'src/app/interfaces/article';
import { Comment } from 'src/app/interfaces/comment';
import { Student } from 'src/app/interfaces/student';
import { User } from 'src/app/interfaces/users';
import { ArticleService } from 'src/app/services/article.service';
import { AuthService } from 'src/app/services/auth.service';
import { CommentService } from 'src/app/services/comment.service';
import { LikeService } from 'src/app/services/like.service';
import { PinService } from 'src/app/services/pin.service';
import { ReviewDialogComponent } from '../review-dialog/review-dialog.component';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss'],
  animations: [fadeup, bounce],
})
export class ActionsComponent implements OnInit {
  @Input() article: Article;
  private articleId: string;

  isliked: boolean;
  likeCount: number;
  isPinned: boolean;
  pinCount: number;
  uid: string;
  students: Student[];

  user$: Observable<User> = this.authService.user$;

  uid$ = this.authService.user$.pipe(
    map((user) => {
      return user?.uid;
    })
  );

  articleId$: Observable<string> = this.route.paramMap.pipe(
    map((params) => {
      return params.get('articleId');
    })
  );

  article$: Observable<Article> = this.route.paramMap.pipe(
    switchMap((param) => {
      return this.articleService.getArticle(param.get('articleId'));
    })
  );

  comments$: Observable<Comment[]> = this.articleId$.pipe(
    switchMap((id) => {
      return this.commentService.getCommentsByArticleId(id);
    })
  );

  isliked$: Observable<boolean> = combineLatest([
    this.article$,
    this.user$,
  ]).pipe(
    switchMap(([article, user]) => {
      if (user) {
        return this.likeService.isLiked(article.id, user.uid);
      } else {
        return of(false);
      }
    })
  );

  isPinned$: Observable<boolean> = combineLatest([
    this.article$,
    this.user$,
  ]).pipe(
    switchMap(([article, user]) => {
      if (user) {
        return this.pinService.isPinned(article.id, user.uid);
      } else {
        return of(false);
      }
    })
  );

  constructor(
    private authService: AuthService,
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private likeService: LikeService,
    private pinService: PinService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private commentService: CommentService
  ) {}

  ngOnInit(): void {
    this.article$.pipe(take(1)).subscribe((article) => {
      if (this.articleId !== article.id) {
        this.likeCount = article.likeCount;
        this.pinCount = article.pinCount;
      }
      this.article = article;
      this.articleId = article.id;
    });

    this.isliked$.subscribe((isliked) => (this.isliked = isliked));
    this.isPinned$.subscribe((isPinned) => (this.isPinned = isPinned));

    this.uid$.subscribe((uid) => (this.uid = uid));
    this.likeService
      .isLiked(this.article.id, this.uid)
      .pipe(take(1))
      .subscribe((bool) => (this.isliked = bool));

    this.articleService
      .getArticle(this.article.id)
      .pipe(take(1))
      .subscribe((article) => {
        this.likeCount = article.likeCount;
      });
  }

  likeArticle(uid: string) {
    if (this.uid) {
      this.isliked = true;
      this.likeCount++;
      this.likeService.likeArticle(this.article.id, uid);
    } else {
      this.snackBar.open('ページ右上のボタンからログインしてください');
    }
  }

  unlikeArticle(uid: string) {
    if (this.uid) {
      this.isliked = false;
      this.likeCount--;
      this.likeService.unlikeArticle(this.article.id, uid);
    } else {
      this.snackBar.open('ページ右上のボタンからログインしてください');
    }
  }

  pinnedArticle(uid: string) {
    if (this.uid) {
      this.isPinned = true;
      this.pinCount++;
      this.pinService.pinnedArticle(this.article.id, uid);
    } else {
      this.snackBar.open('ページ右上のボタンからログインしてください');
    }
  }

  unpinnedArticle(uid: string) {
    if (this.uid) {
      this.isPinned = false;
      this.pinCount--;
      this.pinService.unpinnedArticle(this.article.id, uid);
    } else {
      this.snackBar.open('ページ右上のボタンからログインしてください');
    }
  }

  openReviewDialog() {
    this.dialog.open(ReviewDialogComponent, {
      data: {
        article: this.article,
        uid: this.uid,
      },
    });
  }
}
