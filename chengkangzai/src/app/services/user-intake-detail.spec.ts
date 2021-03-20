import { TestBed } from '@angular/core/testing';

import { UserIntakeDetailService } from './user-intake-detail.service';

describe('TimetableService', () => {
  let service: UserIntakeDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserIntakeDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
