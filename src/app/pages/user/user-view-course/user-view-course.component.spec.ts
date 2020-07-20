import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserViewCourseComponent } from './user-view-course.component';

describe('UserViewCourseComponent', () => {
  let component: UserViewCourseComponent;
  let fixture: ComponentFixture<UserViewCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserViewCourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserViewCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
