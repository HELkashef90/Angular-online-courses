import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagmentUserComponent } from './managment-user.component';

describe('ManagmentUserComponent', () => {
  let component: ManagmentUserComponent;
  let fixture: ComponentFixture<ManagmentUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagmentUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagmentUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
