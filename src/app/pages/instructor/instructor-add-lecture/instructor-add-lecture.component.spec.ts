import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorAddLectureComponent } from './instructor-add-lecture.component';

describe('InstructorAddLectureComponent', () => {
  let component: InstructorAddLectureComponent;
  let fixture: ComponentFixture<InstructorAddLectureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstructorAddLectureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructorAddLectureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
