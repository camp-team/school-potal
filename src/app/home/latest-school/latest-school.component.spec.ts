import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestSchoolComponent } from './latest-school.component';

describe('LatestSchoolComponent', () => {
  let component: LatestSchoolComponent;
  let fixture: ComponentFixture<LatestSchoolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LatestSchoolComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LatestSchoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
