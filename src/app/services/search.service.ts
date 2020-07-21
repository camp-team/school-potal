import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import algoliasearch from 'algoliasearch/lite';

const searchCliant = algoliasearch(
  environment.algolia.appId,
  environment.algolia.searchKey
);

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  index = searchCliant.initIndex('articles');

  constructor() {}
}
