import { Component, OnInit, Inject } from '@angular/core';
import { ArticleService } from 'src/app/sevices/article.service';
import { ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Article } from 'src/app/interfaces/article';

@Component({
  selector: 'app-students-dialog',
  templateUrl: './students-dialog.component.html',
  styleUrls: ['./students-dialog.component.scss'],
})
export class StudentsDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      article: Article;
    },
    private articleService: ArticleService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}
}
