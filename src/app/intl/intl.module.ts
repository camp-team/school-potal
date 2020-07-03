import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IntlRoutingModule } from './intl-routing.module';
import { RuleComponent } from './rule/rule.component';
import { LegalComponent } from '../legal/legal.component';
import { PrivacyComponent } from './privacy/privacy.component';

@NgModule({
  declarations: [RuleComponent, LegalComponent, PrivacyComponent],
  imports: [CommonModule, IntlRoutingModule],
})
export class IntlModule {}
