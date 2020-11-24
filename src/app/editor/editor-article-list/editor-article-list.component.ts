import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ArticleService } from 'src/app/services/article.service';
import { Article } from 'src/app/interfaces/article';
import { tap } from 'rxjs/operators';
import { UiService } from 'src/app/services/ui.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-editor-article-list',
  templateUrl: './editor-article-list.component.html',
  styleUrls: ['./editor-article-list.component.scss'],
})
export class EditorArticleListComponent implements OnInit, AfterViewInit {
  readonly displayedColumns: string[] = [
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
  defaultPageSize = 10;

  @ViewChild(MatPaginator)
  set paginator(value: MatPaginator) {
    if (this.dataSource) {
      this.dataSource.paginator = value;
    }
  }

  constructor(
    private articleService: ArticleService,
    private uiService: UiService,
    private dialog: MatDialog
  ) {
    this.uiService.toggleLoading(true);
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.articleService
      .getArticles()
      .pipe(tap(() => this.uiService.toggleLoading(false)))
      .subscribe((data) => {
        this.dataSource = new MatTableDataSource<Article>(data);
        this.dataSource.paginator = this.paginator;
      });
  }

  openDeleteDialog(article: Article) {
    this.dialog
      .open(DeleteDialogComponent, {
        width: '400px',
        autoFocus: false,
        data: { article },
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.articleService.deleteArticle(article.id);
        } else {
          return;
        }
      });
  }
}
