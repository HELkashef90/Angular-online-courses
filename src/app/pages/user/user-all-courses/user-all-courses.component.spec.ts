import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAllCoursesComponent } from './user-all-courses.component';

describe('UserAllCoursesComponent', () => {
  let component: UserAllCoursesComponent;
  let fixture: ComponentFixture<UserAllCoursesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAllCoursesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAllCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
