import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { ArticleService } from 'src/app/sevices/article.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Article } from 'src/app/interfaces/article';

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
    name: ['', [Validators.required, Validators.maxLength(100)]],
    categorys: ['', [Validators.required]],
    title: ['', [Validators.required, Validators.maxLength(100)]],
    feature: ['', [Validators.required, Validators.maxLength(400)]],
    plan: ['', [Validators.required, Validators.maxLength(400)]],
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

  get feature(): FormControl {
    return this.form.get('feature') as FormControl;
  }

  get plan(): FormControl {
    return this.form.get('plan') as FormControl;
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
          createdAt: new Date(),
          feature: formData.feature,
          plan: formData.plan,
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
