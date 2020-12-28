import { Component, OnInit } from '@angular/core';
import { SeoService } from 'src/app/services/seo.service';

@Component({
  selector: 'app-rule',
  templateUrl: './rule.component.html',
  styleUrls: ['./rule.component.scss'],
})
export class RuleComponent implements OnInit {
  constructor(private seoService: SeoService) {
    this.seoService.setTitleAndMeta(
      '特定商取引法に基づく表記',
      'サービスの特定商取引法に基づく表記ページ'
    );
  }

  ngOnInit(): void {}
}
