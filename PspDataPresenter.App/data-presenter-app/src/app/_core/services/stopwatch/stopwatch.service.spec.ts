/* tslint:disable:no-unused-variable */

import { inject, TestBed } from '@angular/core/testing';

describe('Service: StopwatchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StopwatchService]
    });
  });

  it('should ...', inject([StopwatchService], (service: StopwatchService) => {
    expect(service).toBeTruthy();
  }));
});
