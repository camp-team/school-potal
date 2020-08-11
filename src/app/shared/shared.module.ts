import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [DeleteDialogComponent, DeleteDialogComponent],
  imports: [CommonModule, MatDialogModule, MatDividerModule, MatButtonModule],
  exports: [DeleteDialogComponent],
})
export class SharedModule {}
