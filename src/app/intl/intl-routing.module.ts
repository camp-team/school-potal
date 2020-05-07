import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RuleComponent } from './rule/rule.component';
import { LegalComponent } from '../legal/legal.component';

const routes: Routes = [
  {
    path: 'rule',
    component: RuleComponent,
  },
  {
    path: 'legal',
    component: LegalComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IntlRoutingModule {}
