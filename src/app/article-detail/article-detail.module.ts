import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticleDetailRoutingModule } from './article-detail-routing.module';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { ArticleComponent } from './article/article.component';
import { SideComponent } from './side/side.component';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { StudentsDialogComponent } from './students-dialog/students-dialog.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import { CommentFormComponent } from './comment-form/comment-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommentListComponent } from './comment-list/comment-list.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SharedModule } from '../shared/shared.module';
import { QuillModule } from 'ngx-quill';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRippleModule } from '@angular/material/core';
import { TeacherDialogComponent } from './teachers-dialog/teachers-dialog.component';

@NgModule({
  declarations: [
    ArticleDetailComponent,
    ArticleComponent,
    SideComponent,
    StudentsDialogComponent,
    CommentFormComponent,
    CommentListComponent,
    TeacherDialogComponent,
  ],
  imports: [
    CommonModule,
    ArticleDetailRoutingModule,
    MatIconModule,
    MatTabsModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatSnackBarModule,
    SharedModule,
    QuillModule,
    MatChipsModule,
    MatTooltipModule,
    MatRippleModule,
  ],
})
export class ArticleDetailModule {}
