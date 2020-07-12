import { TestBed } from '@angular/core/testing';

import { LazyLoadScriptsService } from './lazy-load-scripts.service';

describe('LazyLoadScriptsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LazyLoadScriptsService = TestBed.get(LazyLoadScriptsService);
    expect(service).toBeTruthy();
  });
});
