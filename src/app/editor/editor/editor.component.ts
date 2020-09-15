import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormControl,
  FormArray,
} from '@angular/forms';
import { ArticleService } from 'src/app/services/article.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { firestore } from 'firebase';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';

interface Category {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements OnInit {
  processing: boolean;
  images: {
    thumbnailURL: File;
    logo: File;
  } = {
    thumbnailURL: null,
    logo: null,
  };

  srcs: {
    thumbnailURL: File;
    logo: File;
  } = {
    thumbnailURL: null,
    logo: null,
  };

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  tags: string[] = [];

  categoryGroup: Category[] = [
    { value: 'プログラミング', viewValue: 'プログラミング' },
    { value: '外国語', viewValue: '外国語' },
    { value: 'ビジネス', viewValue: 'ビジネス' },
    { value: 'スポーツ', viewValue: 'スポーツ' },
    { value: 'デザイン', viewValue: 'デザイン' },
    { value: '美容', viewValue: '美容' },
    { value: '料理', viewValue: '料理' },
    { value: 'モノづくり', viewValue: 'モノづくり' },
    { value: '音楽', viewValue: '音楽' },
    { value: 'その他', viewValue: 'その他' },
  ];

  form = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(50)]],
    categorys: ['', [Validators.required]],
    title: ['', [Validators.required, Validators.maxLength(150)]],
    feature: [''],
    plan: ['', [Validators.required, Validators.maxLength(400)]],
    serviceURL: [''],
    type: [''],
    teacherIds: this.fb.array([]),
    tags: [['']],
  });

  get name(): FormControl {
    return this.form.get('name') as FormControl;
  }

  get categorys(): FormControl {
    return this.form.get('categorys') as FormControl;
  }

  get title(): FormControl {
    return this.form.get('title') as FormControl;
  }

  get feature(): FormControl {
    return this.form.get('featureBody2') as FormControl;
  }

  get plan(): FormControl {
    return this.form.get('plan') as FormControl;
  }

  get serviceURL(): FormControl {
    return this.form.get('serviceURL') as FormControl;
  }

  get type(): FormControl {
    return this.form.get('type') as FormControl;
  }

  get tagsControl(): FormControl {
    return this.form.get('tags') as FormControl;
  }

  get teacherIds(): FormArray {
    return this.form.get('teacherIds') as FormArray;
  }

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  addForm() {
    this.teacherIds.push(new FormControl(''));
  }

  removeForm(index: number) {
    this.teacherIds.removeAt(index);
  }

  addTag(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if (value?.trim()) {
      this.tags.push(value.trim());
    }

    if (input) {
      input.value = '';
    }
  }

  removeTag(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  convertImage(file: File, type: string) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.srcs[type] = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  setImage(event, type: string) {
    if (event.target.files.length) {
      this.images[type] = event.target.files[0];
      this.convertImage(this.images[type], type);
    }
  }

  submit() {
    this.processing = true;
    const formData = this.form.value;
    this.articleService
      .createArtile(
        {
          name: formData.name,
          title: formData.title,
          category: formData.categorys,
          createdAt: firestore.Timestamp.now(),
          feature: formData.feature,
          plan: formData.plan,
          serviceURL: formData.serviceURL,
          type: formData.type,
          teacherIds: formData.teacherIds,
          tags: this.tags,
          likeCount: 0,
          pinCount: 0,
        },
        this.images
      )
      .then(() => {
        this.snackBar.open('記事を投稿しました！', null, {
          duration: 3000,
        });
      });
    this.processing = false;
  }
}
