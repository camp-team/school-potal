import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorArticleListComponent } from './editor-article-list.component';

describe('EditorArticleListComponent', () => {
  let component: EditorArticleListComponent;
  let fixture: ComponentFixture<EditorArticleListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditorArticleListComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorArticleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
