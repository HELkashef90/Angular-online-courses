import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestrictedUsersComponent } from './restricted-users.component';

describe('RestrictedUsersComponent', () => {
  let component: RestrictedUsersComponent;
  let fixture: ComponentFixture<RestrictedUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestrictedUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestrictedUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
