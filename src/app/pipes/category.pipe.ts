import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'category',
})
export class CategoryPipe implements PipeTransform {
  transform(value: string): string {
    if (value === '') {
      return '';
    }
    if (value === 'プログラミング') {
      return 'programing';
    }
    if (value === '外国語') {
      return 'language';
    }
    if (value === 'ビジネス') {
      return 'business';
    }
    if (value === '料理') {
      return 'cooking';
    }
    if (value === 'モノづくり') {
      return 'create';
    }
    if (value === 'デザイン') {
      return 'design';
    }
    if (value === '音楽') {
      return 'music';
    }
    if (value === '医療') {
      return 'sience';
    }
    if (value === 'スポーツ') {
      return 'sport';
    }
    if (value === '美容') {
      return 'beauty';
    }
    if (value === '総合') {
      return 'comprehensive';
    }
  }
}
