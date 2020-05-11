import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticleDetailRoutingModule } from './article-detail-routing.module';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { ArticleComponent } from './article/article.component';
import { SideComponent } from './side/side.component';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [ArticleDetailComponent, ArticleComponent, SideComponent],
  imports: [
    CommonModule,
    ArticleDetailRoutingModule,
    MatIconModule,
    MatTabsModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
  ],
})
export class ArticleDetailModule {}
