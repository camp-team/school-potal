import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';
import { SearchIndex } from 'algoliasearch/lite';
import { Category } from 'src/app/interfaces/category';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.scss'],
})
export class TagListComponent implements OnInit {
  index: SearchIndex = this.searchService.index.item;
  tags: {
    value: string;
    highlighted: string;
    count: number;
    selected?: boolean;
  }[];
  searchQuery: string;

  categoryGroup: Category[] = [
    {
      value: 'プログラミング',
      viewValue: 'プログラミング',
      photoURL: 'assets/images/category-program.png',
    },
    {
      value: '外国語',
      viewValue: '外国語',
      photoURL: 'assets/images/category-lang.png',
    },
    {
      value: 'スポーツ',
      viewValue: 'スポーツ',
      photoURL: 'assets/images/category-sport.png',
    },
    {
      value: '美容',
      viewValue: '美容',
      photoURL: 'assets/images/category-beauty.png',
    },
    {
      value: '音楽',
      viewValue: '音楽',
      photoURL: 'assets/images/category-music.png',
    },
  ];

  constructor(private searchService: SearchService, private router: Router) {}

  ngOnInit(): void {
    this.index.searchForFacetValues('tags', '').then((result) => {
      this.tags = result.facetHits;
    });
  }

  routeCategoryFilter(category: string) {
    this.router.navigate(['/search'], {
      queryParamsHandling: 'merge',
      queryParams: { category },
    });
  }

  routeTagFilter(tag: string) {
    this.router.navigate(['/search'], {
      queryParamsHandling: 'merge',
      queryParams: { tag },
    });
  }
}
