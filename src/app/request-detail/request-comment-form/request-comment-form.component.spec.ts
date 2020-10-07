import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestCommentFormComponent } from './request-comment-form.component';

describe('RequestCommentFormComponent', () => {
  let component: RequestCommentFormComponent;
  let fixture: ComponentFixture<RequestCommentFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RequestCommentFormComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestCommentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
