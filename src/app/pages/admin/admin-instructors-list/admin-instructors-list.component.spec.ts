import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminInstructorsListComponent } from './admin-instructors-list.component';

describe('AdminInstructorsListComponent', () => {
  let component: AdminInstructorsListComponent;
  let fixture: ComponentFixture<AdminInstructorsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminInstructorsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminInstructorsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
