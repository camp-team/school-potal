import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllRequestRoutingModule } from './all-request-routing.module';
import { AllRequestComponent } from './all-request/all-request.component';

@NgModule({
  declarations: [AllRequestComponent],
  imports: [CommonModule, AllRequestRoutingModule],
})
export class AllRequestModule {}
