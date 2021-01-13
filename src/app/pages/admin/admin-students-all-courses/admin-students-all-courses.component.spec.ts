import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStudentsAllCoursesComponent } from './admin-students-all-courses.component';

describe('AdminStudentsAllCoursesComponent', () => {
  let component: AdminStudentsAllCoursesComponent;
  let fixture: ComponentFixture<AdminStudentsAllCoursesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminStudentsAllCoursesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStudentsAllCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
