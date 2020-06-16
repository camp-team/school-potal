import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticleEditComponent } from './article-edit/article-edit.component';

const routes: Routes = [
  {
    path: '',
    component: ArticleEditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArticleEditRoutingModule {}
