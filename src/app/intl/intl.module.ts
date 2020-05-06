import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IntlRoutingModule } from './intl-routing.module';
import { RuleComponent } from './rule/rule.component';


@NgModule({
  declarations: [RuleComponent],
  imports: [
    CommonModule,
    IntlRoutingModule
  ]
})
export class IntlModule { }
