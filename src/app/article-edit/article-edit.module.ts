import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticleEditRoutingModule } from './article-edit-routing.module';
import { ArticleEditComponent } from './article-edit/article-edit.component';
import { MatTabsModule } from '@angular/material/tabs';
import { EditComponent } from './edit/edit.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatChipsModule } from '@angular/material/chips';
import { QuillModule } from 'ngx-quill';

@NgModule({
  declarations: [ArticleEditComponent, EditComponent],
  imports: [
    CommonModule,
    ArticleEditRoutingModule,
    MatTabsModule,
    MatDividerModule,
    MatSelectModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatRadioModule,
    MatChipsModule,
    QuillModule,
  ],
})
export class ArticleEditModule {}
