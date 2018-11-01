import { TestBed } from '@angular/core/testing';

import { ManageSurveyClassService } from './manage-survey-class.service';

describe('ManageSurveyClassService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ManageSurveyClassService = TestBed.get(ManageSurveyClassService);
    expect(service).toBeTruthy();
  });
});
