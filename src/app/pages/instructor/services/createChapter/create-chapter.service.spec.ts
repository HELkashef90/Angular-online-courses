import { TestBed } from '@angular/core/testing';

import { CreateChapterService } from './create-chapter.service';

describe('CreateChapterService', () => {
  let service: CreateChapterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateChapterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
