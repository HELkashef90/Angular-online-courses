import { TestBed } from '@angular/core/testing';

import { CreateLectureService } from './create-lecture.service';

describe('CreateLectureService', () => {
  let service: CreateLectureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateLectureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
