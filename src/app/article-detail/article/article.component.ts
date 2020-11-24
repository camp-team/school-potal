import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/interfaces/article';
import { map, switchMap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { Teacher } from 'src/app/interfaces/teacher';
import { AuthService } from 'src/app/services/auth.service';
import { TeacherDialogComponent } from '../teachers-dialog/teachers-dialog.component';
import { fade, bounce, openClose } from '../../animations';
import { CommentWithUser } from 'src/app/interfaces/comment';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  animations: [fade, bounce, openClose],
})
export class ArticleComponent implements OnInit {
  @Input() article: Article;
  @ViewChild('target') target: ElementRef;

  private teachers: Teacher[];

  uid: string;
  selectedTeacherNum = 0;
  features = new Array(5);
  isOpen = [];

  articleId$: Observable<string> = this.route.paramMap.pipe(
    map((param) => {
      return param.get('articleId');
    })
  );

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

  comments$: Observable<CommentWithUser[]> = this.articleId$.pipe(
    switchMap((id) => {
      return this.commentService.getCommentsWithUserByArticleId(id);
    })
  );

  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private commentService: CommentService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.teachers$.subscribe((teachers) => (this.teachers = teachers));
    this.article$.subscribe((article) => {
      this.article.plans = article.plans;
      this.article.plans.forEach(() => {
        this.isOpen.push(false);
      });
    });
  }

  isActiveTeacher(i: number): void {
    this.selectedTeacherNum = i;
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
}
