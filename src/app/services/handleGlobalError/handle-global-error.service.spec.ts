import { TestBed } from '@angular/core/testing';

import { HandleGlobalErrorService } from './handle-global-error.service';

describe('HandleGlobalErrorService', () => {
  let service: HandleGlobalErrorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HandleGlobalErrorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
