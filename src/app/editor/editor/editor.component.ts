import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

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
  categorys: Category[] = [
    { value: 'programing-0', viewValue: 'プログラミング' },
    { value: 'language-1', viewValue: '外国語' },
    { value: 'business-2', viewValue: 'ビジネス' },
    { value: 'sports-3', viewValue: 'スポーツ' },
    { value: 'dance-4', viewValue: 'ダンス' },
    { value: 'beauty-5', viewValue: '美容' },
    { value: 'cooking-6', viewValue: '料理' },
    { value: 'create-7', viewValue: 'モノづくり' },
    { value: 'music-8', viewValue: '音楽' },
    { value: 'other-9', viewValue: 'その他' },
  ];

  form = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(100)]],
    categorys: ['', [Validators.required]],
    title: ['', [Validators.required, Validators.maxLength(100)]],
    feature: ['', [Validators.required, Validators.maxLength(400)]],
    plan: ['', [Validators.required, Validators.maxLength(400)]],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  submit() {
    console.log(this.form.value);
  }
}
