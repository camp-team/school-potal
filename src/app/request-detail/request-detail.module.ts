import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestDetailRoutingModule } from './request-detail-routing.module';
import { RequestDetailComponent } from './request-detail/request-detail.component';

@NgModule({
  declarations: [RequestDetailComponent],
  imports: [CommonModule, RequestDetailRoutingModule],
})
export class RequestDetailModule {}
