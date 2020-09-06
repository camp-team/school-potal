import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ArticleService } from 'src/app/services/article.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { firestore } from 'firebase';
import { Observable } from 'rxjs';
import { Article } from 'src/app/interfaces/article';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap, map } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';

interface Category {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  uid: string;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  tags: string[] = [];

  likeCount: number;

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
    category: ['', [Validators.required]],
    title: ['', [Validators.required, Validators.maxLength(150)]],
    feature: [''],
    plan: ['', [Validators.required, Validators.maxLength(400)]],
    serviceURL: [''],
    type: [''],
    id: [''],
    teacherId: [''],
    tags: [['']],
  });

  images: {
    thumbnailURL?: File;
    logo?: File;
  } = {
    thumbnailURL: null,
    logo: null,
  };

  srcs: {
    thumbnailURL?: File;
    logo?: File;
  } = {
    thumbnailURL: null,
    logo: null,
  };

  article$: Observable<Article> = this.route.paramMap.pipe(
    switchMap((param) => {
      const articleId = param.get('articleId');
      return this.articleService.getArticle(articleId);
    })
  );

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
    return this.form.get('feature') as FormControl;
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

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    this.authService.user$
      .pipe(
        map((user) => {
          return user.uid;
        })
      )
      .subscribe((uid) => {
        this.uid = uid;
      });
  }

  ngOnInit(): void {
    this.article$.subscribe((article) => {
      this.tags = article.tags;
      this.likeCount = article.likeCount;
      this.form.patchValue({
        ...article,
        tags: null,
      });
    });
  }

  addTag(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
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
    const formData = this.form.value;
    this.articleService
      .updateArticle(
        {
          name: formData.name,
          title: formData.title,
          category: formData.category,
          updatedAt: firestore.Timestamp.now(),
          feature: formData.feature,
          plan: formData.plan,
          serviceURL: formData.serviceURL,
          type: formData.type,
          id: formData.id,
          teacherId: formData.teacherId,
          tags: this.tags,
          likeCount: this.likeCount,
        },
        this.images
      )
      .then(() => {
        this.router.navigateByUrl('/');
        this.snackBar.open('記事を更新しました！', null, {
          duration: 3000,
        });
      });
  }
}
