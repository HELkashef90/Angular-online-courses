import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancedSearchPaymentStudentComponent } from './advanced-search-payment-student.component';

describe('AdvancedSearchPaymentStudentComponent', () => {
  let component: AdvancedSearchPaymentStudentComponent;
  let fixture: ComponentFixture<AdvancedSearchPaymentStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvancedSearchPaymentStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvancedSearchPaymentStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
