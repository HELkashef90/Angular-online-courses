import { TestBed } from '@angular/core/testing';

import { PWAControllerService } from './pwacontroller.service';

describe('PWAControllerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PWAControllerService = TestBed.get(PWAControllerService);
    expect(service).toBeTruthy();
  });
});
