import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces/article';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  article: Article = {
    id: '01',
    thumbnail: '/assets/images/thumbnail-01.png',
    Title: 'CAMP',
    category: 'プログラミング',
    day: '2020.5.01',
    price: '12,500円 /月〜'
  };

  constructor() { }

  ngOnInit(): void {
  }

}
