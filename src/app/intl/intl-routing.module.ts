import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RuleComponent } from './rule/rule.component';


const routes: Routes = [
  {
    path: 'rule',
    component: RuleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IntlRoutingModule { }
