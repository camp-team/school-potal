import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchResultComponent } from './search-result/search-result.component';

const routes: Routes = [
  {
    path: 'search',
    component: SearchResultComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'intl',
    loadChildren: () => import('./intl/intl.module').then((m) => m.IntlModule),
  },
  {
    path: 'article-detail/:articleId',
    loadChildren: () =>
      import('./article-detail/article-detail.module').then(
        (m) => m.ArticleDetailModule
      ),
  },
  {
    path: 'editor',
    loadChildren: () =>
      import('./editor/editor.module').then((m) => m.EditorModule),
  },
  {
    path: 'article-edit',
    loadChildren: () =>
      import('./article-edit/article-edit.module').then(
        (m) => m.ArticleEditModule
      ),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
