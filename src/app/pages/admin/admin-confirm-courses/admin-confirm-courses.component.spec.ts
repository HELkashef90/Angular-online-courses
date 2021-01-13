import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminConfirmCoursesComponent } from './admin-confirm-courses.component';

describe('AdminConfirmCoursesComponent', () => {
  let component: AdminConfirmCoursesComponent;
  let fixture: ComponentFixture<AdminConfirmCoursesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminConfirmCoursesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminConfirmCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
