import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestDetailRoutingModule } from './request-detail-routing.module';
import { RequestDetailComponent } from './request-detail/request-detail.component';
import { RequestCommentFormComponent } from './request-comment-form/request-comment-form.component';
import { RequestCommentListComponent } from './request-comment-list/request-comment-list.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SharedModule } from '../shared/shared.module';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    RequestDetailComponent,
    RequestCommentFormComponent,
    RequestCommentListComponent,
  ],
  imports: [
    CommonModule,
    RequestDetailRoutingModule,
    MatFormFieldModule,
    MatIconModule,
    MatDividerModule,
    MatInputModule,
    MatButtonModule,
    MatMenuModule,
    ReactiveFormsModule,
    FormsModule,
    MatSnackBarModule,
    SharedModule,
    MatTooltipModule,
  ],
})
export class RequestDetailModule {}
