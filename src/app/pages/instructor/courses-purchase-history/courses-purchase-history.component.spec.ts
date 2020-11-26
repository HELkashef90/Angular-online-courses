import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesPurchaseHistoryComponent } from './courses-purchase-history.component';

describe('CoursesPurchaseHistoryComponent', () => {
  let component: CoursesPurchaseHistoryComponent;
  let fixture: ComponentFixture<CoursesPurchaseHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursesPurchaseHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesPurchaseHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
