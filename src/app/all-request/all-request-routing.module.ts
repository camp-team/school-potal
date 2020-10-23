import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllRequestComponent } from './all-request/all-request.component';

const routes: Routes = [
  {
    path: '',
    component: AllRequestComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllRequestRoutingModule {}
