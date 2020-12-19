import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { AccountComponent } from './account/account.component';
import { SettingsComponent } from './settings/settings.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '../shared/shared.module';
import { ProfileComponent } from './profile/profile.component';
import { PinsComponent } from './pins/pins.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { InfoDialogComponent } from './info-dialog/info-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AccountComponent,
    SettingsComponent,
    ProfileComponent,
    PinsComponent,
    InfoDialogComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatFormFieldModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatChipsModule,
    MatButtonModule,
    SharedModule,
    MatProgressSpinnerModule,
    MatDialogModule,
  ],
})
export class UserModule {}
