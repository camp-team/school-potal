import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ArticleService } from 'src/app/services/article.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { firestore } from 'firebase';
import { Observable } from 'rxjs';
import { Article } from 'src/app/interfaces/article';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap, map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/services/auth.service';

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

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    private db: AngularFirestore,
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

  get name(): FormControl {
    return this.form.get('name') as FormControl;
  }

  get categorys(): FormControl {
    return this.form.get('categorys') as FormControl;
  }

  get title(): FormControl {
    return this.form.get('title') as FormControl;
  }

  get featureTitle1(): FormControl {
    return this.form.get('featureTitle1') as FormControl;
  }
  get featureBody1(): FormControl {
    return this.form.get('featureBody1') as FormControl;
  }
  get featureTitle2(): FormControl {
    return this.form.get('featureTitle2') as FormControl;
  }
  get featureBody2(): FormControl {
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

  article$: Observable<Article> = this.route.paramMap.pipe(
    switchMap((param) => {
      const articleId = param.get('articleId');
      return this.articleService.getArticle(articleId);
    }),
    tap((article) => {
      console.log(article);
    })
  );

  categoryGroup: Category[] = [
    { value: 'プログラミング', viewValue: 'プログラミング' },
    { value: '外国語', viewValue: '外国語' },
    { value: 'ビジネス', viewValue: 'ビジネス' },
    { value: 'スポーツ', viewValue: 'スポーツ' },
    { value: 'ダンス', viewValue: 'ダンス' },
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
    featureTitle1: ['', [Validators.required, Validators.maxLength(50)]],
    featureBody1: ['', [Validators.required, Validators.maxLength(200)]],
    featureTitle2: ['', [Validators.required, Validators.maxLength(50)]],
    featureBody2: ['', [Validators.required, Validators.maxLength(200)]],
    plan: ['', [Validators.required, Validators.maxLength(400)]],
    serviceURL: [''],
    type: [''],
    id: [''],
    teacherId: [''],
  });

  id: string;

  images: {
    thumbnailURL?: File;
    logo?: File;
    image1?: File;
    image2?: File;
  } = {
    thumbnailURL: null,
    logo: null,
    image1: null,
    image2: null,
  };

  srcs: {
    thumbnailURL?: File;
    logo?: File;
    image1?: File;
    image2?: File;
  } = {
    thumbnailURL: null,
    logo: null,
    image1: null,
    image2: null,
  };

  ngOnInit(): void {
    this.article$.subscribe((article) => this.form.patchValue(article));
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
      console.log(this.images);
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
          featureTitle1: formData.featureTitle1,
          featureBody1: formData.featureBody1,
          featureTitle2: formData.featureTitle2,
          featureBody2: formData.featureBody2,
          plan: formData.plan,
          serviceURL: formData.serviceURL,
          type: formData.type,
          id: formData.id,
          teacherId: formData.teacherId,
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
