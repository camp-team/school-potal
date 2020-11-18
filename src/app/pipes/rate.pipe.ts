import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rate',
})
export class RatePipe implements PipeTransform {
  transform(value: number): string {
    if (value === null) {
      return '評価なし';
    }
    if (value <= 1) {
      return '<img src="assets/images/star.png" alt="star">';
    }
    if (value > 1 && value < 1.5) {
      return '<img src="assets/images/star.png" alt="star">';
    }
    if (value > 1.5 && value < 2) {
      return '<img src="assets/images/star.png" alt="star"><img src="assets/images/harf-star.png" alt="star">';
    }
    if (value > 2 && value < 2.5) {
      return '<img src="assets/images/star.png" alt="star"><img src="assets/images/star.png" alt="star">';
    }
    if (value > 2.5 && value < 3) {
      return '<img src="assets/images/star.png" alt="star"><img src="assets/images/star.png" alt="star"><img src="assets/images/harf-star.png" alt="star">';
    }
    if (value > 3 && value < 3.5) {
      return '<img src="/assets/images/star.png" alt="star"><img src="/assets/images/star.png" alt="star"><img src="/assets/images/star.png" alt="star">';
    }
    if (value > 3.5 && value < 4) {
      return '<img src="/assets/images/star.png" alt="star"><img src="/assets/images/star.png" alt="star"><img src="/assets/images/star.png" alt="star"><img src="/assets/images/harf-star.png" alt="star">';
    }
    if (value > 4 && value < 4.5) {
      return '<img src="/assets/images/star.png" alt="star"><img src="/assets/images/star.png" alt="star"><img src="/assets/images/star.png" alt="star"><img src="/assets/images/star.png" alt="star">';
    }
    if (value > 4.5 && value < 5) {
      return '<img src="/assets/images/star.png" alt="star"><img src="/assets/images/star.png" alt="star"><img src="/assets/images/star.png" alt="star"><img src="/assets/images/star.png" alt="star"><img src="/assets/images/harf-star.png" alt="star">';
    }
    if (value === 5) {
      return '<img src="/assets/images/star.png" alt="star"><img src="/assets/images/star.png" alt="star"><img src="/assets/images/star.png" alt="star"><img src="/assets/images/star.png" alt="star"><img src="assets/images/star.png" alt="star">';
    }
  }
}
