import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { Observable, combineLatest, of, ReplaySubject, Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/interfaces/article';
import { switchMap, take, map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { StudentsDialogComponent } from '../students-dialog/students-dialog.component';
import { Teacher } from 'src/app/interfaces/teacher';
import { LikeService } from 'src/app/services/like.service';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PinService } from 'src/app/services/pin.service';
import { TeacherDialogComponent } from '../teachers-dialog/teachers-dialog.component';
import { fade, bounce } from '../../animations';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  animations: [fade, bounce],
})
export class ArticleComponent implements OnInit {
  @Input() article: Article;
  @ViewChild('target') target: ElementRef;

  selectedTeacherNum = 0;
  isliked: boolean;
  likeCount: number;
  uid: string;
  articleId: string;
  isPinned: boolean;
  pinCount: number;
  teachers: Teacher[];

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
      return user?.uid;
    })
  );

  user$ = this.authService.user$;

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
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private likeService: LikeService,
    private snackBar: MatSnackBar,
    private pinService: PinService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.article$.subscribe((article) => {
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

    this.teachers$.subscribe((teachers) => (this.teachers = teachers));
  }

  scroll(): void {
    this.target.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

  isActiveTeacher(i: number): void {
    this.selectedTeacherNum = i;
  }

  openStudentsDialog(article: Article) {
    this.dialog.open(StudentsDialogComponent, {
      width: '400px',
      autoFocus: false,
      restoreFocus: false,
      data: { article },
    });
  }

  openTeachersDialog(article: Article) {
    this.dialog.open(TeacherDialogComponent, {
      width: '400px',
      autoFocus: false,
      restoreFocus: false,
      data: {
        article,
        teachers: this.teachers,
      },
    });
  }

  likeArticle(uid: string) {
    if (this.uid) {
      this.isliked = true;
      this.article.likeCount++;
      this.likeService.likeArticle(this.article.id, uid);
    } else {
      this.snackBar.open('ページ右上のボタンからログインしてください');
    }
  }

  unlikeArticle(uid: string) {
    if (this.uid) {
      this.isliked = false;
      this.article.likeCount--;
      this.likeService.unlikeArticle(this.article.id, uid);
    } else {
      this.snackBar.open('ページ右上のボタンからログインしてください');
    }
  }

  pinnedArticle(uid: string) {
    if (this.uid) {
      this.isPinned = true;
      this.article.pinCount++;
      this.pinService.pinnedArticle(this.article.id, uid);
    } else {
      this.snackBar.open('ページ右上のボタンからログインしてください');
    }
  }

  unpinnedArticle(uid: string) {
    if (this.uid) {
      this.isPinned = false;
      this.article.pinCount--;
      this.pinService.unpinnedArticle(this.article.id, uid);
    } else {
      this.snackBar.open('ページ右上のボタンからログインしてください');
    }
  }
}
