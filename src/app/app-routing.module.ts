import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchResultComponent } from './search-result/search-result.component';
import { ShellComponent } from './shell/shell.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadChildren: () =>
          import('./home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'search',
        component: SearchResultComponent,
      },
      {
        path: 'intl',
        loadChildren: () =>
          import('./intl/intl.module').then((m) => m.IntlModule),
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
        canLoad: [AuthGuard],
        canActivate: [AuthGuard],
      },
      {
        path: 'login',
        loadChildren: () =>
          import('./login/login.module').then((m) => m.LoginModule),
      },
      {
        path: 'user/:uid',
        loadChildren: () =>
          import('./user/user.module').then((m) => m.UserModule),
        canLoad: [AuthGuard],
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
