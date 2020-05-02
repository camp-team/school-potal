import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { ArticleComponent } from './article/article.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [HomeComponent, ArticleComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatIconModule
  ]
})
export class HomeModule { }
