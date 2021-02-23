import { TestBed } from '@angular/core/testing';

import { StoreSettingsService } from './store-settings.service';

describe('StoreSettingsService', () => {
  let service: StoreSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoreSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
