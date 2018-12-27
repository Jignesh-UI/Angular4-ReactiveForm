import { TestBed, inject } from '@angular/core/testing';

import { BaseClassService } from './base-class.service';

describe('BaseClassService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BaseClassService]
    });
  });

  it('should be created', inject([BaseClassService], (service: BaseClassService) => {
    expect(service).toBeTruthy();
  }));
});
