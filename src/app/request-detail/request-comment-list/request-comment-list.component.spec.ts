import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestCommentListComponent } from './request-comment-list.component';

describe('RequestCommentListComponent', () => {
  let component: RequestCommentListComponent;
  let fixture: ComponentFixture<RequestCommentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RequestCommentListComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestCommentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
