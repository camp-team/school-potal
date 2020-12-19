import {
  Component,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
} from '@angular/core';
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
import { Observable } from 'rxjs';
import { Article } from 'src/app/interfaces/article';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/interfaces/category';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements OnInit {
  @Output() event = new EventEmitter<Article>();
  private likeCount: number;
  private pinnedCount: number;
  private images: {
    thumbnailURL: File;
    spThumbnailURL: File;
    logo: File;
  } = {
    thumbnailURL: null,
    spThumbnailURL: null,
    logo: null,
  };

  article: Article;
  isComplete: boolean;
  processing: boolean;
  srcs: {
    thumbnailURL: File;
    spThumbnailURL: File;
    logo: File;
  } = {
    thumbnailURL: null,
    spThumbnailURL: null,
    logo: null,
  };

  readonly MAX_NAME_LENGTH = 50;
  readonly MAX_TITLE_LENGTH = 150;
  readonly MAX_PLAN_LENGTH = 400;
  readonly MAX_FEATURE_LENGTH = 100;
  readonly MAX_PLANNAME_LENGTH = 50;
  readonly MAX_PLANBODY_LENGTH = 150;
  readonly MAX_PLICE_LENGTH = 10;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  tags: string[] = [];

  categoryGroup: Category[] = [
    { value: 'プログラミング' },
    { value: '外国語' },
    { value: 'ビジネス' },
    { value: 'スポーツ' },
    { value: 'デザイン' },
    { value: '美容' },
    { value: '料理' },
    { value: 'モノづくり' },
    { value: '音楽' },
    { value: '医療' },
  ];

  form = this.fb.group({
    name: [
      '',
      [Validators.required, Validators.maxLength(this.MAX_NAME_LENGTH)],
    ],
    category: ['', [Validators.required]],
    title: [
      '',
      [Validators.required, Validators.maxLength(this.MAX_TITLE_LENGTH)],
    ],
    features: this.fb.array(['', '', '', '', '']),
    topics: [''],
    plans: this.fb.array([
      this.fb.group({
        planName: ['', [Validators.maxLength(this.MAX_PLANNAME_LENGTH)]],
        planBody: ['', [Validators.maxLength(this.MAX_PLANBODY_LENGTH)]],
        plice: ['', [Validators.maxLength(this.MAX_PLICE_LENGTH)]],
      }),
    ]),
    serviceURL: [
      '',
      [
        Validators.pattern(
          '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?'
        ),
      ],
    ],
    type: ['', [Validators.required]],
    teacherIds: this.fb.array([]),
    tags: [['']],
    id: [''],
  });

  article$: Observable<Article> = this.route.paramMap.pipe(
    switchMap((param) => {
      const articleId = param.get('articleId');
      return this.articleService.getArticle(articleId);
    })
  );

  get name(): FormControl {
    return this.form.get('name') as FormControl;
  }

  get category(): FormControl {
    return this.form.get('category') as FormControl;
  }

  get title(): FormControl {
    return this.form.get('title') as FormControl;
  }

  get features(): FormArray {
    return this.form.get('features') as FormArray;
  }

  get plans(): FormArray {
    return this.form.get('plans') as FormArray;
  }

  get topics(): FormControl {
    return this.form.get('topics') as FormControl;
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
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.article$.subscribe((article?) => {
      this.article = article;

      if (this.article) {
        this.tags = article?.tags;
        this.likeCount = article?.likeCount;
        this.form.patchValue({
          ...article,
          tags: null,
        });
        if (this.article.teacherIds) {
          article.teacherIds.forEach((teacherId) => {
            const array = new FormControl(teacherId);
            this.teacherIds.push(array);
          });
          this.event.emit(this.article);
        }
        if (this.article.plans) {
          article.plans.forEach((plan) => {
            const formGroup = this.fb.group({
              planName: [
                plan.planName,
                [Validators.maxLength(this.MAX_PLANNAME_LENGTH)],
              ],
              planBody: [
                plan.planBody,
                [Validators.maxLength(this.MAX_PLANBODY_LENGTH)],
              ],
              plice: [
                plan.plice,
                [Validators.maxLength(this.MAX_PLICE_LENGTH)],
              ],
            });
            this.plans.push(formGroup);
          });
        }
      } else {
        const array = new FormControl('');
        this.teacherIds.push(array);
      }
    });
  }

  addPlanControl() {
    this.plans.push(
      this.fb.group({
        planName: [''],
        planBody: [''],
        plice: [''],
      })
    );
  }

  removePlanControl(index: number) {
    this.plans.removeAt(index);
  }

  addTeacherIdControl() {
    this.teacherIds.push(new FormControl(''));
  }

  removeTeacherIdControl(index: number) {
    this.teacherIds.removeAt(index);
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
    this.processing = true;
    const formData = this.form.value;

    if (!this.article) {
      this.articleService
        .createArtile(
          {
            name: formData.name,
            title: formData.title,
            category: formData.category,
            createdAt: firestore.Timestamp.now(),
            features: formData.features,
            topics: formData.topics,
            plans: formData.plans,
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
          this.router.navigateByUrl('/');
          this.snackBar.open('記事を投稿しました！');
        });
    } else {
      this.articleService
        .updateArticle(
          {
            name: formData.name,
            title: formData.title,
            category: formData.category,
            updatedAt: firestore.Timestamp.now(),
            features: formData.features,
            topics: formData.topics,
            plans: formData.plans,
            serviceURL: formData.serviceURL,
            type: formData.type,
            id: formData.id,
            teacherIds: formData.teacherIds,
            tags: this.tags,
            likeCount: this.likeCount || 0,
            pinCount: this.pinnedCount || 0,
          },
          this.images
        )
        .then(() => {
          this.router.navigateByUrl('/');
          this.snackBar.open('記事を更新しました！');
        });
    }

    this.isComplete = true;
    this.processing = false;
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.form.dirty) {
      $event.preventDefault();
      $event.returnValue = '作業中の内容が失われますがよろしいですか？';
    }
  }
}
