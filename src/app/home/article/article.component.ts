import { Component, OnInit, Input } from '@angular/core';
import { Article } from 'src/app/interfaces/article';

const MOCK_ARTICLE = {
  thumbnail: './assets/images/thumbnail-01.png',
  avatarURL: 'https://dummyimage.com/80x80.png',
  title: 'CAMP',
  category: 'プログラミング',
  createdAt: new Date(),
  price: '12,500円 /月',
};

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  @Input() article: Article;
  articles: Article[] = new Array(15).fill(MOCK_ARTICLE);

  constructor() {}

  ngOnInit(): void {}
}
