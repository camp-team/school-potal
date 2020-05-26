import { Component, OnInit, Input } from '@angular/core';
import { Article } from 'src/app/interfaces/article';

const MOCK_ARTICLE = {
  thumbnailURL: './assets/images/thumbnail-01.png',
  logo: 'https://dummyimage.com/80x80.png',
  title: 'CAMP',
  category: 'プログラミング',
  createdAt: new Date(),
  plan: '12,500円 /月',
};

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
})
export class ArticleListComponent implements OnInit {
  @Input() article: Article;
  articles: Article[] = new Array(15).fill(MOCK_ARTICLE);

  constructor() {}

  ngOnInit(): void {}
}
