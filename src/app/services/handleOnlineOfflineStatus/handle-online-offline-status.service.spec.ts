import { TestBed } from '@angular/core/testing';

import { HandleOnlineOfflineStatusService } from './handle-online-offline-status.service';

describe('HandleOnlineOfflineStatusService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HandleOnlineOfflineStatusService = TestBed.get(HandleOnlineOfflineStatusService);
    expect(service).toBeTruthy();
  });
});
