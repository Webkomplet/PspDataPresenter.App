/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MessageBrokerProcessorService } from './message-broker-processor.service';

describe('Service: MessageBrokerProcessor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessageBrokerProcessorService]
    });
  });

  it('should ...', inject([MessageBrokerProcessorService], (service: MessageBrokerProcessorService) => {
    expect(service).toBeTruthy();
  }));
});
