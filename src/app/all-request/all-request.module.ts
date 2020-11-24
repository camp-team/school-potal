import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllRequestRoutingModule } from './all-request-routing.module';
import { AllRequestComponent } from './all-request/all-request.component';
import { MatIconModule } from '@angular/material/icon';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [AllRequestComponent],
  imports: [
    CommonModule,
    AllRequestRoutingModule,
    MatIconModule,
    InfiniteScrollModule,
    MatProgressSpinnerModule,
  ],
})
export class AllRequestModule {}
