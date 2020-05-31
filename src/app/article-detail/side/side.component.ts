import { Component, OnInit, Input } from '@angular/core';
import { Article } from 'src/app/interfaces/article';

const ARTICLE = {
  thumbnailURL: './assets/images/thumbnail-01.png',
  avatarURL: 'https://dummyimage.com/80x80.png',
  title:
    'オリジナルサービスを開発して起業もあり！即戦力となる実務スキルが身につくプログラミング版ライザップ',
  category: 'プログラミング',
  createdAt: new Date(),
  price: '12,500円 /月',
};

@Component({
  selector: 'app-side',
  templateUrl: './side.component.html',
  styleUrls: ['./side.component.scss'],
})
export class SideComponent implements OnInit {
  @Input() article: Article;
  articles: Article[] = new Array(15).fill(ARTICLE);

  constructor() {}

  ngOnInit(): void {}
}
