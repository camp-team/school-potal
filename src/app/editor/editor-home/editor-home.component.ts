import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editor-home',
  templateUrl: './editor-home.component.html',
  styleUrls: ['./editor-home.component.scss'],
})
export class EditorHomeComponent implements OnInit {
  childData: any;

  readonly navLinks = [
    {
      label: '新規作成',
      path: 'create',
    },
    {
      label: '記事一覧',
      path: 'editor-article-list',
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  onReceive(eventData) {
    this.childData = eventData;
  }
}
