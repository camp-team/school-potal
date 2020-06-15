import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditorComponent } from './editor/editor.component';
import { EditorArticleListComponent } from './editor-article-list/editor-article-list.component';
import { EditorMemberListComponent } from './editor-member-list/editor-member-list.component';
import { EditorHomeComponent } from './editor-home/editor-home.component';

const routes: Routes = [
  {
    path: '',
    component: EditorHomeComponent,
    children: [
      {
        path: 'editor',
        component: EditorComponent,
      },
      {
        path: 'editor-article-list',
        component: EditorArticleListComponent,
      },
      {
        path: 'editor-member-list',
        component: EditorMemberListComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditorRoutingModule {}
