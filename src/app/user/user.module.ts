import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { AccountComponent } from './account/account.component';
import { SettingComponent } from './setting/setting.component';

@NgModule({
  declarations: [AccountComponent, SettingComponent],
  imports: [CommonModule, UserRoutingModule],
})
export class UserModule {}
