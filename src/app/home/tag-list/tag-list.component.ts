import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';
import { SearchIndex } from 'algoliasearch/lite';
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

  categoryGroup: {
    value: string;
    highlighted: string;
    count?: number | null;
  }[];

  constructor(private searchService: SearchService, private router: Router) {}

  ngOnInit(): void {
    this.index.searchForFacetValues('tags', '').then((result) => {
      this.tags = result.facetHits;
    });
    this.index.searchForFacetValues('category', '').then((result) => {
      this.categoryGroup = result.facetHits;
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
