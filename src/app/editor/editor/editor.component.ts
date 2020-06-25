import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { ArticleService } from 'src/app/services/article.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { firestore } from 'firebase';

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
  images: {
    thumbnailURL: File;
    logo: File;
    image1?: File;
    image2?: File;
  } = {
    thumbnailURL: null,
    logo: null,
  };

  srcs: {
    thumbnailURL: File;
    logo: File;
    image1?: File;
    image2?: File;
  } = {
    thumbnailURL: null,
    logo: null,
  };

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
    categorys: ['', [Validators.required]],
    title: ['', [Validators.required, Validators.maxLength(150)]],
    featureTitle1: ['', [Validators.required, Validators.maxLength(50)]],
    featureBody1: ['', [Validators.required, Validators.maxLength(200)]],
    featureTitle2: ['', [Validators.required, Validators.maxLength(50)]],
    featureBody2: ['', [Validators.required, Validators.maxLength(200)]],
    plan: ['', [Validators.required, Validators.maxLength(400)]],
    serviceURL: [''],
    type: [''],
  });

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    private db: AngularFirestore,
    private snackBar: MatSnackBar
  ) {}

  // ファイルをHTMLで扱えるURLに変換するメソッド
  convertImage(file: File, type: string) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.srcs[type] = e.target.result;
    };
    reader.readAsDataURL(file);
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

  ngOnInit(): void {}

  // エディター画面に画像をセットするメソッド
  setImage(event, type: string) {
    if (event.target.files.length) {
      this.images[type] = event.target.files[0];
      this.convertImage(this.images[type], type);
    }
    console.log(type);
  }

  // submitでFireStoreへ記事投稿するメソッド
  submit() {
    const formData = this.form.value;
    this.articleService
      .createArtile(
        {
          name: formData.name,
          title: formData.title,
          category: formData.categorys,
          createdAt: firestore.Timestamp.now(),
          featureTitle1: formData.featureTitle1,
          featureBody1: formData.featureBody1,
          featureTitle2: formData.featureTitle2,
          featureBody2: formData.featureBody2,
          plan: formData.plan,
          serviceURL: formData.serviceURL,
          type: formData.type,
        },
        this.images
      )
      .then(() => {
        this.snackBar.open('記事を投稿しました！', null, {
          duration: 3000,
        });
      });
  }
}
