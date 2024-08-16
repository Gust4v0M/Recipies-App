import { TestBed } from '@angular/core/testing';

import { InfoRecipiesService } from './info-recipies.service';

describe('InfoRecipiesService', () => {
  let service: InfoRecipiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfoRecipiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
