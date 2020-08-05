import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestSalonComponent } from './latest-salon.component';

describe('LatestSalonComponent', () => {
  let component: LatestSalonComponent;
  let fixture: ComponentFixture<LatestSalonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LatestSalonComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LatestSalonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
