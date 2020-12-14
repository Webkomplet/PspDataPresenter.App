/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DateSynchronizationService } from './date-synchronization.service';

describe('Service: DateSynchronizationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DateSynchronizationService]
    });
  });

  it('should ...', inject([DateSynchronizationService], (service: DateSynchronizationService) => {
    expect(service).toBeTruthy();
  }));
});
