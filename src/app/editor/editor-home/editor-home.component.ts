import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editor-home',
  templateUrl: './editor-home.component.html',
  styleUrls: ['./editor-home.component.scss'],
})
export class EditorHomeComponent implements OnInit {
  navLinks = [
    {
      label: '記事作成',
      path: 'editor',
    },
    {
      label: '記事一覧',
      path: 'editor-article-list',
    },
    {
      label: 'メンバー管理',
      path: 'editor-member-list',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
