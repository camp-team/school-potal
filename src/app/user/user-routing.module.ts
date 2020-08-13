import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { SettingComponent } from './setting/setting.component';

const routes: Routes = [
  {
    path: '',
    component: AccountComponent,
    children: [
      {
        path: 'setting',
        component: SettingComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
