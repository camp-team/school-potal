import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IntlRoutingModule } from './intl-routing.module';
import { RuleComponent } from './rule/rule.component';
import { LegalComponent } from '../legal/legal.component';

@NgModule({
  declarations: [RuleComponent, LegalComponent],
  imports: [CommonModule, IntlRoutingModule],
})
export class IntlModule {}
