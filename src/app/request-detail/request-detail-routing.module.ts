import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RequestDetailComponent } from './request-detail/request-detail.component';

const routes: Routes = [
  {
    path: '',
    component: RequestDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequestDetailRoutingModule {}
