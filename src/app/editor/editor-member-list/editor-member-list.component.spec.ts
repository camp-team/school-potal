import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorMemberListComponent } from './editor-member-list.component';

describe('EditorMemberListComponent', () => {
  let component: EditorMemberListComponent;
  let fixture: ComponentFixture<EditorMemberListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditorMemberListComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorMemberListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
