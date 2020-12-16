import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserStudyCourseComponent } from './user-study-course.component';

describe('UserStudyCourseComponent', () => {
  let component: UserStudyCourseComponent;
  let fixture: ComponentFixture<UserStudyCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserStudyCourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserStudyCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
