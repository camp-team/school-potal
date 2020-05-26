import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [HomeComponent, ArticleListComponent],
  imports: [CommonModule, HomeRoutingModule, MatIconModule],
})
export class HomeModule {}
