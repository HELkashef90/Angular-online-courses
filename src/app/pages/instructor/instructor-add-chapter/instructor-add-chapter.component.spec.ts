import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorAddChapterComponent } from './instructor-add-chapter.component';

describe('InstructorAddChapterComponent', () => {
  let component: InstructorAddChapterComponent;
  let fixture: ComponentFixture<InstructorAddChapterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstructorAddChapterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructorAddChapterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
