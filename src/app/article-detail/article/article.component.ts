import { Component, OnInit, Input } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { Observable, combineLatest, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/interfaces/article';
import { switchMap, take, map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { StudentsDialogComponent } from '../students-dialog/students-dialog.component';
import { Teacher } from 'src/app/interfaces/teacher';
import { LikeService } from 'src/app/services/like.service';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  @Input() article: Article;

  isliked: boolean;
  likeCount: number;
  uid: string;
  articleId: string;

  article$: Observable<Article> = this.route.paramMap.pipe(
    switchMap((param) => {
      return this.articleService.getArticle(param.get('articleId'));
    })
  );

  teachers$: Observable<Teacher[]> = this.route.paramMap.pipe(
    switchMap((data) => {
      const articleId = data.get('articleId');
      return this.articleService.getTeachers(articleId);
    })
  );

  uid$ = this.authService.user$.pipe(
    map((user) => {
      return user.uid;
    })
  );

  user$ = this.authService.user$;

  isliked$ = combineLatest([this.article$, this.user$]).pipe(
    switchMap(([article, user]) => {
      if (user) {
        return this.likeService.isLiked(article.id, user.uid);
      } else {
        return of(false);
      }
    })
  );

  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private likeService: LikeService,
    private snackBar: MatSnackBar,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.article$.subscribe((article) => {
      if (this.articleId !== article.id) {
        this.likeCount = article.likeCount;
      }
      this.article = article;
      this.articleId = article.id;
    });

    this.isliked$.subscribe((isliked) => (this.isliked = isliked));

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

  openStudentsDialog(article: Article) {
    this.dialog.open(StudentsDialogComponent, {
      width: '400px',
      autoFocus: false,
      restoreFocus: false,
      data: { article },
    });
  }

  likeArticle(uid: string) {
    if (this.uid) {
      this.isliked = true;
      this.article.likeCount++;
      console.log(this.article.id);
      console.log(uid);
      this.likeService.likeArticle(this.article.id, uid);
    } else {
      this.snackBar.open('ページ右上のボタンからログインしてください', null, {
        duration: 2500,
      });
    }
  }

  unlikeArticle(uid: string) {
    if (this.uid) {
      this.isliked = false;
      this.article.likeCount--;
      this.likeService.unlikeArticle(this.article.id, uid);
    } else {
      this.snackBar.open('ページ右上のボタンからログインしてください', null, {
        duration: 2500,
      });
    }
  }
}
