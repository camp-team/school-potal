import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticleEditRoutingModule } from './article-edit-routing.module';
import { ArticleEditComponent } from './article-edit/article-edit.component';

@NgModule({
  declarations: [ArticleEditComponent],
  imports: [CommonModule, ArticleEditRoutingModule],
})
export class ArticleEditModule {}
