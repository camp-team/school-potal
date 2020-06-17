import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-article-edit',
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.scss'],
})
export class ArticleEditComponent implements OnInit {
  navLinks = [
    {
      label: '記事編集',
      path: 'edit',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
