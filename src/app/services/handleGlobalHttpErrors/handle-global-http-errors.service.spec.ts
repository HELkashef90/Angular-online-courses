import { TestBed } from '@angular/core/testing';

import { HandleGlobalHttpErrorsService } from './handle-global-http-errors.service';

describe('HandleGlobalHttpErrorsService', () => {
  let service: HandleGlobalHttpErrorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HandleGlobalHttpErrorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
