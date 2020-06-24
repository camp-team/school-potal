import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ArticleService } from 'src/app/sevices/article.service';
import { Article } from 'src/app/interfaces/article';
import { tap, switchMap } from 'rxjs/operators';
import { LoadingService } from 'src/app/services/loading.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-editor-article-list',
  templateUrl: './editor-article-list.component.html',
  styleUrls: ['./editor-article-list.component.scss'],
})
export class EditorArticleListComponent implements OnInit {
  displayedColumns: string[] = [
    'number',
    'status',
    'id',
    'name',
    'createdAt',
    'updatedAt',
    'category',
    'menu',
  ];
  dataSource: MatTableDataSource<Article>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private articleService: ArticleService,
    private loadingService: LoadingService,
    private dialog: MatDialog
  ) {
    this.loadingService.toggleLoading(true);
  }

  ngOnInit() {
    this.articleService
      .getArticles()
      .pipe(tap(() => this.loadingService.toggleLoading(false)))
      .subscribe((data) => {
        this.dataSource = new MatTableDataSource<Article>(data);
        this.dataSource.paginator = this.paginator;
      });
  }

  openDeleteDialog(article: Article) {
    this.dialog.open(DeleteDialogComponent, {
      width: '400px',
      autoFocus: false,
      // restoreFocus: false,
      data: { article },
    });
    console.log(article);
  }
}
