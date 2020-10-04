import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditorComponent } from './editor/editor.component';
import { EditorArticleListComponent } from './editor-article-list/editor-article-list.component';
import { EditorMemberListComponent } from './editor-member-list/editor-member-list.component';
import { EditorHomeComponent } from './editor-home/editor-home.component';
import { EditorGuard } from '../guards/editor.guard';
import { ArticleEditComponent } from '../article-edit/article-edit/article-edit.component';

const routes: Routes = [
  {
    path: '',
    component: EditorHomeComponent,
    children: [
      {
        path: 'create',
        component: EditorComponent,
        canDeactivate: [EditorGuard],
      },
      {
        path: 'editor-article-list',
        component: EditorArticleListComponent,
      },
      {
        path: ':articleId',
        component: EditorComponent,
        canDeactivate: [EditorGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditorRoutingModule {}
