import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IDMPageComponent } from './idmpage.component';

describe('IDMPageComponent', () => {
  let component: IDMPageComponent;
  let fixture: ComponentFixture<IDMPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IDMPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IDMPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
